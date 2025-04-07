package main

import (
	. "search_backend/elastic_search_client"
	"search_backend/grpc_server"
	httpserver "search_backend/http_server"
	"search_backend/lib"
)

func main() {
	configParser := lib.ConfigParser{}
	configParser.ParseConfig("config/config.yml")
	config := configParser.ServiceConfig

	esClient := ElasticSearchClient{}
	esClient.Connect()

	http_server := httpserver.SearchServer{}

	go grpc_server.StartServer(config.GrpcSeverPort, &esClient)
	go http_server.StartServer(config.HttpSeverPort, &esClient)
	inifineChan := make(chan bool)
	<-inifineChan
}
