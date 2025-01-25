package server

import (
	. "client_backend/kafka"
	. "client_backend/minio"
	. "client_backend/postgres"
	. "client_backend/redis"
	. "client_backend/server/handlers"
	"encoding/json"
	"log"
	"net/http"
)

type ServerImpl struct {
	minioClient    *MinioClient
	redisClient    *RedisClient
	kafkaClient    *KafkaClient
	postgresClient *PostgresClient
}

func SetDefaultHeaders(w http.ResponseWriter) http.ResponseWriter {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Max-Age", "15")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	return w
}

func (serverImpl *ServerImpl) CheckResourcePassword(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w)

	if r.Method == "GET" {
		resourceUuid := r.PathValue("resourceUuid")
		passwordToCheck := r.Header.Get("Password")
		result := ResourcePasswordCheck(resourceUuid, passwordToCheck, serverImpl.redisClient)
		resultJson, _ := json.Marshal(result)
		w.WriteHeader(http.StatusOK)
		w.Write(resultJson)
	}
}

func (serverImpl *ServerImpl) GetResourceMetaData(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w)

	if r.Method == "GET" {
		resourceUuid := r.PathValue("resourceUuid")
		resourceMetaData := GetResourceMetaData(resourceUuid, serverImpl.redisClient)
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
	w = SetDefaultHeaders(w)

	resourceUuid := r.PathValue("resourceUuid")
	textData, err := GetResourceData(resourceUuid, serverImpl.redisClient, serverImpl.minioClient)

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/text")
	w.Write(textData)
}

func (serverImpl *ServerImpl) UploadDocument(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w)

	if r.Method == "POST" {
		len := r.ContentLength
		body := make([]byte, len)
		r.Body.Read(body)

		userName := r.Header.Get("User")
		filePassword := r.Header.Get("Password")
		fileName := r.Header.Get("FileName")
		folderName := r.Header.Get("FolderName")

		resourceUuid := CreateResource(body, userName, filePassword, fileName, folderName, serverImpl.redisClient, serverImpl.minioClient)
		w.Write([]byte(resourceUuid))
	}
}

func (serverImpl *ServerImpl) CreateUser(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w)

	if r.Method == "POST" {
		userName := r.Header.Get("UserName")
		email := r.Header.Get("Email")
		password := r.Header.Get("Password")

		err := CreateUser(userName, email, password, serverImpl.postgresClient)

		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusNotFound)
			return
		}
	}
}

func (serverImpl *ServerImpl) CheckAccountPassword(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w)

	if r.Method == "GET" {
		userName := r.Header.Get("UserName")
		password := r.Header.Get("Password")

		result, err := CheckAccountPassword(userName, password, serverImpl.postgresClient)

		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		resultJson, _ := json.Marshal(result)
		w.WriteHeader(http.StatusOK)
		w.Write(resultJson)
	}
}
