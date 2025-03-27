package handlers

import (
	"bytes"
	. "client_backend/lib"
	. "client_backend/models"
	. "client_backend/models_for_server"
	. "client_backend/postgres"
	. "client_backend/postgres/models"
	"compress/gzip"
	"io"
	"log"
	"time"
	"unicode/utf8"
)

func CreateResource(body []byte, userId, userName, language, highlightSetting, filePassword, fileName, folderName string, ttl int, context *HandleContext) string {
	decompressed, err := gzip.NewReader(bytes.NewReader(body))
	if err != nil {
		log.Fatalln("Encoding gzip error: ", err)
	}
	defer decompressed.Close()

	decompressedData, err := io.ReadAll(decompressed)
	if err != nil {
		log.Fatalln("Reading decompressed data error: ", err)
	}

	document := Translate(decompressedData, language, context)

	log.Println("File", document, int64(utf8.RuneCountInString(document)))

	fileName += ".txt"
	filePath := folderName + "/" + fileName
	userName = GetUserBucketName(userName)

	err = context.MinioClient.UploadFile(userName, filePath, document, int64(utf8.RuneCountInString(document)))

	hashString := userId + fileName + time.Now().String()
	resourceUuid := GetHash(hashString)
	passwordHash := ""
	if len(filePassword) > 0 {
		passwordHash = GetHash(filePassword)
	}

	err = context.RedisClient.UploadResourceMetaData(resourceUuid, ttl, &ResourceMetaData{
		Title:            fileName,
		Path:             folderName,
		Owner:            userName,
		OwnerId:          userId,
		Password:         passwordHash,
		Preview:          document[:min(len(document), 100)],
		Type:             "text",
		HighlightSetting: highlightSetting,
		CreationTime:     uint64(time.Now().Unix()),
	})

	if err != nil {
		log.Println(err)
	}

	if userId == "temp" {
		result := Find(context.PostgresClient.Database, &User{
			Name: "temp",
		})
		if result.RowsAffected == 0 {
			Create(context.PostgresClient.Database, &User{Id: "temp", Name: "temp", Email: "temp", Password: "temp"})
		}
	}

	result := Create(
		context.PostgresClient.Database,
		&UserResources{
			UserId:     userId,
			ResourceId: resourceUuid,
		},
	)

	if result.Error != nil {
		log.Println(result.Error)
	}

	return resourceUuid
}
