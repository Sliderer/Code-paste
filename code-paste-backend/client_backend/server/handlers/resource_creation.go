package handlers

import (
	"bytes"
	. "client_backend/lib"
	. "client_backend/models"
	. "client_backend/postgres/models"
	"compress/gzip"
	"io"
	"log"
	"time"
	"unicode/utf8"
)

func CreateResource(body []byte, userId, userName, filePassword, fileName, folderName string, context *HandleContext) string {
	decompressed, err := gzip.NewReader(bytes.NewReader(body))
	if err != nil {
		log.Fatalln("Encoding gzip error: ", err)
	}
	defer decompressed.Close()

	decompressedData, err := io.ReadAll(decompressed)
	if err != nil {
		log.Fatalln("Reading decompressed data error: ", err)
	}

	document := string(decompressedData)
	resultChannel := make(chan error)

	fileName += ".txt"
	filePath := folderName + "/" + fileName
	userName = GetUserBucketName(userName)

	go context.MinioClient.UploadFile(userName, filePath, document, int64(utf8.RuneCountInString(document)), resultChannel)
	select {
	case err := <-resultChannel:
		if err != nil {

		}
	}

	hashString := userId + fileName + time.Now().String()
	resourceUuid := GetHash(hashString)
	passwordHash := ""
	if len(filePassword) > 0 {
		passwordHash = GetHash(filePassword)
	}

	context.RedisClient.UploadResourceMetaData(resourceUuid, &ResourceMetaData{
		Title:    fileName,
		Path:     folderName,
		Owner:    userName,
		Password: passwordHash,
		Preview:  document[:min(len(document), 100)],
	})

	context.PostgresClient.Database.Create(&UserResources{
		UserId:     userId,
		ResourceId: resourceUuid,
	})

	return resourceUuid
}
