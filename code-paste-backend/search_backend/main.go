package main

import (
	"log"
	. "search_backend/elastic_search_client"
	"search_backend/grpc_server"
	"search_backend/lib"
)

func main() {
	configParser := lib.ConfigParser{}
	configParser.ParseConfig("config/config.yml")
	config := configParser.ServiceConfig

	esClient := ElasticSearchClient{}
	esClient.Connect()
	r, err := esClient.Client.Indices.Create("text_resources")
	if err != nil {
		log.Fatal(err)
	} else {
		log.Println(r)
	}
	grpc_server.StartServer(config.SeverPort, &esClient)
}
