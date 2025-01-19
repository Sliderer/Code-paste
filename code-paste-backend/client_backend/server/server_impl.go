package server

import (
	"bytes"
	. "client_backend/kafka"
	. "client_backend/minio"
	. "client_backend/redis"
	"compress/gzip"
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

func (serverImpl *ServerImpl) SendDocumentToIndex() {

}

func (serverImpl *ServerImpl) GetDocument(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Max-Age", "15")

	resourceId := r.PathValue("resourceId")
	resourcePath := serverImpl.redisClient.GetResourcePath(resourceId)
	octetData, err := serverImpl.minioClient.DownloadFile("temp", resourcePath)

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

	decompressed, err := gzip.NewReader(bytes.NewReader(body))
	if err != nil {
		panic(err)
	}
	defer decompressed.Close()

	decompressedData, err := io.ReadAll(decompressed)
	if err != nil {
		panic(err)
	}

	document := string(decompressedData)
	resultChannel := make(chan error)
	userName := r.PathValue("userName")
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
	go serverImpl.redisClient.UploadResourceData(resourceUuid.String(), fileName)

	log.Println("Uploaded resource: ", resourceUuid.String(), " Path: ", fileName)
}
