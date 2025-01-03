package main

import (
	. "client_backend/server"
)

func main() {
	server := ClientServer{}

	server.StartServer()
}
