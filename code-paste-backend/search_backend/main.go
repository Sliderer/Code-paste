package main

import (
	"search_backend/grpc_server"
	"search_backend/lib"
)

func main() {
	configParser := lib.ConfigParser{}
	configParser.ParseConfig("config/config.yml")
	config := configParser.ServiceConfig

	grpc_server.StartServer(config.SeverPort)
}
