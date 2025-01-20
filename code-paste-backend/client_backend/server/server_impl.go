package server

import (
	"bytes"
	. "client_backend/kafka"
	. "client_backend/minio"
	. "client_backend/models"
	. "client_backend/redis"
	"compress/gzip"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"unicode/utf8"

	"github.com/google/uuid"
)

type ServerImpl struct {
	minioClient *MinioClient
	redisClient *RedisClient
	kafkaClient *KafkaClient
}

func (serverImpl *ServerImpl) GetResourceMetaData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Max-Age", "15")

	resourceId := r.PathValue("resourceId")
	resourceMetaData := serverImpl.redisClient.GetResourceMetaData(resourceId)

	responseData, err := json.Marshal(resourceMetaData)

	if err != nil {
		log.Println(err)
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/text")
	w.Write(responseData)
}

func (serverImpl *ServerImpl) GetResourceData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Max-Age", "15")

	resourceId := r.PathValue("resourceId")
	resourceMetaData := serverImpl.redisClient.GetResourceMetaData(resourceId)
	octetData, err := serverImpl.minioClient.DownloadFile("temp", resourceMetaData.Path)

	if err != nil {
		log.Println(err)
	}

	textData, err := io.ReadAll(octetData)
	if err != nil {
		panic(err)
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/text")
	w.Write(textData)
}

func (serverImpl *ServerImpl) UploadDocument(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Max-Age", "15")

	len := r.ContentLength
	body := make([]byte, len)
	r.Body.Read(body)
	log.Println(body)

	var request ResourceCreationRequest
	json.Unmarshal(body, &request)

	log.Printf(request.Data)
	decompressed, err := gzip.NewReader(bytes.NewReader([]byte(request.Data)))
	if err != nil {
		log.Fatalln("Encoding gzip error: ", err)
	}
	defer decompressed.Close()

	decompressedData, err := io.ReadAll(decompressed)
	if err != nil {
		log.Fatalln("Reading decompressed data error: ", err)
	}

	document := string(decompressedData)
	resultChannel := make(chan error)
	log.Println(r.Header)
	userName := r.Header.Get("User")
	filePassword := r.Header.Get("Password")
	fileName := r.PathValue("fileName")
	folderName := r.PathValue("folderName")
	fileName = folderName + "/" + fileName
	go serverImpl.minioClient.UploadFile(userName, fileName, document, int64(utf8.RuneCountInString(document)), resultChannel)
	select {
	case err := <-resultChannel:
		if err != nil {
			log.Println("Error uploading the file: ", err)
		}
	}

	resourceUuid := uuid.New()
	go serverImpl.redisClient.UploadResourceMetaData(resourceUuid.String(), ResourceMetaData{
		Path:     fileName,
		Owner:    userName,
		Password: filePassword,
	})

	log.Println("Uploaded resource: ", resourceUuid.String(), " Path: ", fileName)
}
