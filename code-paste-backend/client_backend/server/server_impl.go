package server

import (
	. "client_backend/kafka"
	. "client_backend/minio"
	. "client_backend/redis"
	. "client_backend/server/handlers"
	"encoding/json"
	"log"
	"net/http"
)

type ServerImpl struct {
	minioClient *MinioClient
	redisClient *RedisClient
	kafkaClient *KafkaClient
}

func (serverImpl *ServerImpl) CheckResourcePassword(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Max-Age", "15")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	if r.Method == "GET" {
		resourceUuid := r.PathValue("resourceUuid")
		passwordToCheck := r.Header.Get("Password")
		result := ResourcePasswordCheckGet(resourceUuid, passwordToCheck, serverImpl.redisClient)
		resultJson, _ := json.Marshal(result)
		w.WriteHeader(http.StatusOK)
		w.Write(resultJson)
	}
}

func (serverImpl *ServerImpl) GetResourceMetaData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Max-Age", "15")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	if r.Method == "GET" {
		resourceUuid := r.PathValue("resourceUuid")
		resourceMetaData := ResourceMetaDataGet(resourceUuid, serverImpl.redisClient)
		response, err := json.Marshal(resourceMetaData)

		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write(response)
	}
}

func (serverImpl *ServerImpl) GetResourceData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Max-Age", "15")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	resourceUuid := r.PathValue("resourceUuid")
	textData, err := ResourceDataGet(resourceUuid, serverImpl.redisClient, serverImpl.minioClient)

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/text")
	w.Write(textData)
}

func (serverImpl *ServerImpl) UploadDocument(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Max-Age", "15")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	if r.Method == "POST" {
		len := r.ContentLength
		body := make([]byte, len)
		r.Body.Read(body)

		userName := r.Header.Get("User")
		filePassword := r.Header.Get("Password")
		fileName := r.Header.Get("FileName")
		folderName := r.Header.Get("FolderName")

		resourceUuid := ResourceCreationPost(body, userName, filePassword, fileName, folderName, serverImpl.redisClient, serverImpl.minioClient)
		w.Write([]byte(resourceUuid))
	}
}
