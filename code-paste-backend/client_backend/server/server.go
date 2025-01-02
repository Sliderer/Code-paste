package server

import "../lib/server_settings"


type ClientServer struct {
	serverSettings ServerSettings
	minioClient MinioClient
	kafkaClient KafkaClient
	serverImpl ServerImpl
}

func (server *ClientServer) StartServer() {

}

