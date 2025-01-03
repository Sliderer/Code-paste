package server

import (
	. "client_backend/kafka"
	. "client_backend/lib"
	. "client_backend/minio"
	"net/http"
)

type ClientServer struct {
	serverSettings ServerSettings
	minioClient    MinioClient
	kafkaClient    KafkaClient
	serverImpl     ServerImpl
}

func (server *ClientServer) StartServer() {
	http.HandleFunc("/upload_resource", server.serverImpl.UploadDocument)
	http.ListenAndServe(":80", nil)
}
