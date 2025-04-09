package handlers

import (
	. "client_backend/lib"
	. "client_backend/models"
	. "client_backend/models_for_server"
	. "client_backend/postgres"
	. "client_backend/postgres/models"
	"client_backend/requests"
	"log"
	"strings"
	"time"
)

func CreateFolderHandler(request requests.CreateFolder, context *HandleContext) error {

	hashString := request.UserId + request.FolderName + "folder" + time.Now().String()
	resourceUuid := GetHash(hashString)

	err := context.RedisClient.UploadResourceMetaData(resourceUuid, 0, &ResourceMetaData{
		Title:   request.FolderName,
		Path:    request.FolderPath,
		Owner:   request.UserName,
		OwnerId: request.UserId,
		Type:    "folder",
	})

	if err != nil {
		log.Println("Can not upload folder", err)
		return err
	}

	result := Create(
		context.PostgresClient.Database,
		&UserFolders{
			UserId:     request.UserId,
			ResourceId: resourceUuid,
			FolderPath: request.FolderPath + "/" + request.FolderName,
		},
	)

	if result.Error != nil {
		log.Println("Can not upload folder", result.Error)
		return result.Error
	}

	return nil
}

func DeleteFolder(userId, resourceUuid string, context *HandleContext) error {

	userResource := UserFolders{}
	result := Delete(
		context.PostgresClient.Database.Where("user_id = ? AND resource_id = ?", userId, resourceUuid),
		&userResource,
	)

	if result.Error != nil {
		log.Println("Can not upload folder", result.Error)
		return result.Error
	}

	return nil
}

func GetFolderUuid(path string, context *HandleContext) (string, error) {

	userName := strings.Split(path, "/")[0]
	canonisedPath := "default/" + strings.Join(strings.Split(path, "/")[1:], "/")

	var user User
	result := Find(context.PostgresClient.Database.Where("name = ?", userName).Limit(1), &user)

	var userFolder UserFolders
	result = Find(context.PostgresClient.Database.Where("user_id = ? AND folder_path = ?", user.Id, canonisedPath), &userFolder)

	log.Println(userFolder.ResourceId, path)
	return userFolder.ResourceId, result.Error
}
