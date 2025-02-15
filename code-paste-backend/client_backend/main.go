package main

import (
	. "client_backend/lib"
	. "client_backend/server"
)

func main() {
	configParser := ConfigParser{}
	config := configParser.ParseConfig("./config/config.yml")
	server := ClientServer{
		ServerSettings: config,
	}
	server.InitFields()
	server.StartServer()
}
