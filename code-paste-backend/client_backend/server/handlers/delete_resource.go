package handlers

import (
	. "client_backend/lib"
	. "client_backend/models_for_server"
	. "client_backend/postgres"
	. "client_backend/postgres/models"
	"errors"
	"log"
)

func DeleteResource(userId, userName, resourceUuid string, session *ClientSession, context *HandleContext) error {
	resourceMetaData, err := context.RedisClient.GetResourceMetaData(resourceUuid)

	if err != nil {
		log.Println("Error getting metadata for deleting resource", err)
		return err
	}

	if resourceMetaData.Owner != "temp" {
		if !session.IsAuthenticated() {
			return errors.New("Unauthorized")
		}
	} else {
		userId = "temp"
		userName = "temp"
	}

	err = context.RedisClient.DeleteResourceMetaData(resourceUuid)

	if err != nil {
		log.Println("Error deleting metadata from redis")
		return err
	}

	userResource := UserResources{}
	result := Delete(
		context.PostgresClient.Database.Where("user_id = ? AND resource_id = ?", userId, resourceUuid),
		&userResource,
	)
	if result.Error != nil {
		log.Println("Error deleting user resource from postgresql", result.Error)
		return result.Error
	}

	likedResource := LikedResources{}
	result = Delete(
		context.PostgresClient.Database.Where("user_id = ? AND resource_id = ?", userId, resourceUuid),
		&likedResource,
	)

	if result.Error != nil {
		log.Println("Error deleting liked resource from postgresql", result.Error)
		return result.Error
	}

	bucketName := GetUserBucketName(userName)
	err = context.MinioClient.DeleteFile(bucketName, resourceMetaData.Path+"/"+resourceMetaData.Title)
	return err
}
