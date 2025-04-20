package daemons

import (
	"bytes"
	. "client_backend/models"
	. "client_backend/server"
	"encoding/json"
	"log"
	"time"
)

func UpdateIAMToken(server *ClientServer) {
	iamRequest := IAMRequest{OuathToken: server.ServerSettings.Oauth}
	jsonRequest, _ := json.Marshal(iamRequest)
	resp, err := server.HttpClient.Post(server.ServerSettings.IAMurl, "application/json", bytes.NewReader(jsonRequest))
	if err != nil {
		log.Println(err)
	}

	len := resp.ContentLength
	body := make([]byte, len)
	resp.Body.Read(body)
	var iamResponse IAMResponse
	json.Unmarshal(body, &iamResponse)

	server.SetIAMToken(iamResponse.IAM)
	log.Println(server.IAM)
	resp.Body.Close()
}

func GetIAMTokenDaemon(server *ClientServer, firstRunChannel chan bool) {
	UpdateIAMToken(server)
	firstRunChannel <- true
	for {
		time.Sleep(time.Hour)
		UpdateIAMToken(server)
	}
}
