package handlers

import (
	"bytes"
	. "client_backend/lib"
	. "client_backend/models"
	. "client_backend/models_for_server"
	. "client_backend/postgres"
	. "client_backend/postgres/models"
	. "client_backend/proto/notifications"
	. "client_backend/proto/search"
	"client_backend/requests"
	"compress/gzip"
	ctx "context"
	"errors"
	"io"
	"log"
	"time"
	"unicode/utf8"
)

func CreateResourceHandler(request requests.CreateResource, context *HandleContext) (string, error) {
	compressedData := bytes.NewReader(request.Data)
	decompressed, err := gzip.NewReader(compressedData)

	if err != nil {
		log.Fatalln("Encoding gzip error: ", err)
		return "", err
	}
	defer decompressed.Close()

	decompressedData, err := io.ReadAll(decompressed)
	if err != nil {
		log.Println("Reading decompressed data error: ", err)
		return "", err
	}

	document := Translate(decompressedData, request.Language, context)

	fileName := request.FileName + ".txt"
	filePath := request.FolderName + "/" + fileName
	userName := GetUserBucketName(request.UserName)

	if request.FolderName != "default" {
		var folder UserFolders
		folderLookup := Find(
			context.PostgresClient.Database.Where("user_id = ? AND folder_path = ?", request.UserId, request.FolderName),
			&folder,
		)

		if folderLookup.Error != nil || folder.FolderPath != request.FolderName {
			return "", errors.New("такой папки не существует")
		}
	}

	err = context.MinioClient.UploadFile(userName, filePath, document, int64(utf8.RuneCountInString(document)))
	if err != nil {
		log.Println("Error uploading file in minio: ", err)
		return "", err
	}

	hashString := request.UserId + fileName + time.Now().String()
	resourceUuid := GetHash(hashString)
	passwordHash := ""
	if len(request.Password) > 0 {
		passwordHash = GetHash(request.Password)
	}

	err = context.RedisClient.UploadResourceMetaData(resourceUuid, request.TTL, &ResourceMetaData{
		Title:            fileName,
		Path:             request.FolderName,
		Owner:            request.UserName,
		OwnerId:          request.UserId,
		Password:         passwordHash,
		Preview:          document[:min(len(document), 100)],
		Type:             "text",
		HighlightSetting: request.HighlightSetting,
		CreationTime:     uint64(time.Now().Unix()),
	})

	if err != nil {
		log.Println("Error uploading in redis: ", err)
		return "", errors.New("не удалось загрузить файл, попробуйте снова")
	}

	if request.UserId == "temp" {
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
			UserId:     request.UserId,
			ResourceId: resourceUuid,
		},
	)

	if result.Error != nil {
		log.Println(result.Error)
		return "", errors.New("не удалось загрузить файл, попробуйте снова")
	}

	if request.UserId != "temp" {
		SendNotifications(context, request.UserId, userName)
	}

	go (*context.SearchClient).UploadInIndex(ctx.Background(), &UploadInIndexRequest{
		Language:     request.Language,
		ResourceUuid: resourceUuid,
		Data:         request.Data,
	})

	return resourceUuid, nil
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
