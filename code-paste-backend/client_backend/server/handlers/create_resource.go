package handlers

import (
	"bytes"
	. "client_backend/lib"
	. "client_backend/models"
	. "client_backend/models_for_server"
	. "client_backend/postgres"
	. "client_backend/postgres/models"
	. "client_backend/proto/notifications"
	"compress/gzip"
	ctx "context"
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

	if userId != "temp" {
		SendNotifications(context, userId, userName)
	}

	return resourceUuid
}

func SendNotifications(context *HandleContext, userId, userName string) {
	var subscribtions []Subscribtions
	Find(
		context.PostgresClient.Database.Where("publisher_id = ?", userId),
		&subscribtions,
	)

	for _, subscribtion := range subscribtions {
		var subscriber User
		Find(
			context.PostgresClient.Database.Where("id = ?", subscribtion.SubscriberId),
			&subscriber,
		)
		log.Println("Subscriber: ", subscriber.Telegram)
		(*context.NotificationsClient).SendNotification(
			ctx.Background(),
			&SendNotificationRequest{
				Sender:   userName,
				Reciever: subscriber.Email,
				Type:     NotificationType_Email,
			},
		)

		if len(subscriber.Telegram) > 0 {
			(*context.NotificationsClient).SendNotification(
				ctx.Background(),
				&SendNotificationRequest{
					Sender:   userName,
					Reciever: subscriber.Telegram,
					Type:     NotificationType_Telegram,
				},
			)
		}
	}
}
