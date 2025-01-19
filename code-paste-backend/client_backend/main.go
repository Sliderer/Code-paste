package main

import (
	. "client_backend/server"
)

func main() {
	server := ClientServer{}
	server.InitFields()
	server.StartServer()
}
