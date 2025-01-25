package handlers

import (
	"bytes"
	. "client_backend/lib"
	. "client_backend/minio"
	. "client_backend/models"
	. "client_backend/redis"
	"compress/gzip"
	"io"
	"log"
	"time"
	"unicode/utf8"
)

func CreateResource(body []byte, userName, filePassword, fileName, folderName string, redisClient *RedisClient, minioClient *MinioClient) string {
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
	go minioClient.UploadFile(userName, filePath, document, int64(utf8.RuneCountInString(document)), resultChannel)
	select {
	case err := <-resultChannel:
		if err != nil {
			log.Println("Error uploading the file: ", err)
		}
	}

	hashString := userName + fileName + time.Now().String()
	resourceUuid := GetHash(hashString)
	passwordHash := ""
	if len(filePassword) > 0 {
		passwordHash = GetHash(filePassword)
	}

	go redisClient.UploadResourceMetaData(resourceUuid, &ResourceMetaData{
		Name:     fileName,
		Path:     folderName,
		Owner:    userName,
		Password: passwordHash,
	})

	return resourceUuid
}
