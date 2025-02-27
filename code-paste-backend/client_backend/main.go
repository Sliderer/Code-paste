package main

import (
	. "client_backend/lib"
	. "client_backend/server"
	. "client_backend/server/daemons"
)

func main() {
	configParser := ConfigParser{}
	config := configParser.ParseConfig("./config/config.yml")
	server := ClientServer{
		ServerSettings: config,
	}
	server.InitFields()

	readyChannel := make(chan bool)
	go GetIAMTokenDaemon(&server, readyChannel)
	select {
	case <-readyChannel:
	}
	server.StartServer()
}
