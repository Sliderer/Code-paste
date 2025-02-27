package handlers

import (
	. "client_backend/lib"
	. "client_backend/models"
	. "client_backend/models_for_server"
	. "client_backend/postgres/models"
	response "client_backend/responses"
	"io"
	"log"
	"strings"

	"gorm.io/gorm"
)

func GetResourceMetaData(userId, resourceUuid, requestSenderName string, context *HandleContext) (response.ResourceMetaDataResponse, error) {
	resourceMetaData, err := context.RedisClient.GetResourceMetaData(resourceUuid)
	if err != nil {
		return response.ResourceMetaDataResponse{}, err
	}

	isLiked := false
	if len(userId) > 0 {
		var likedResourceRow LikedResources
		result := context.PostgresClient.Database.Where("user_id = ? AND resource_id = ?", userId, resourceUuid).Find(&likedResourceRow)
		isLiked = result.RowsAffected > 0 && likedResourceRow.IsActive
	}

	return response.ResourceMetaDataResponse{
		IsPrivate:               resourceMetaData.HasPassword(),
		IsPrivateForCurrentUser: resourceMetaData.Owner != GetUserBucketName(requestSenderName),
		IsLiked:                 isLiked,
		Owner:                   resourceMetaData.Owner,
		Name:                    resourceMetaData.Title,
	}, nil
}

func ResourcePasswordCheck(resourceUuid string, passwordToCheck string, context *HandleContext) (response.PredicateResponse, error) {
	hashedPassword := GetHash(passwordToCheck)
	resourceMetaData, err := context.RedisClient.GetResourceMetaData(resourceUuid)
	if err != nil {
		return response.PredicateResponse{}, err
	}
	return response.PredicateResponse{
		Result: resourceMetaData.Password == hashedPassword,
	}, nil
}

func GetResourceData(resourceUuid string, context *HandleContext) ([]byte, error) {
	resourceMetaData, err := context.RedisClient.GetResourceMetaData(resourceUuid)
	if err != nil {
		return nil, err
	}
	resourceFullPath := resourceMetaData.Path + "/" + resourceMetaData.Title

	octetData, err := context.MinioClient.DownloadFile(resourceMetaData.Owner, resourceFullPath)

	if err != nil {
		return nil, err
	}

	textData, err := io.ReadAll(octetData)
	if err != nil {
		return nil, err
	}

	return textData, nil
}

func GetUserResources(userId string, offset int, needOnlyLiked bool, context *HandleContext) ([]ResourcePreview, error) {
	var userResourceUuids []string
	const resourcesCountLimit = 30
	var result *gorm.DB

	if needOnlyLiked {
		var likedResources []LikedResources
		result = context.PostgresClient.Database.Offset(offset).Limit(resourcesCountLimit).Select("resource_id").Where("user_id = ? AND is_active", userId).Find(&likedResources)
		for _, value := range likedResources {
			userResourceUuids = append(userResourceUuids, value.ResourceId)
		}
	} else {
		var userResources []UserResources
		result = context.PostgresClient.Database.Offset(offset).Limit(resourcesCountLimit).Select("resource_id").Where("user_id = ?", userId).Find(&userResources)
		for _, value := range userResources {
			userResourceUuids = append(userResourceUuids, value.ResourceId)
		}
	}

	if result.Error != nil {
		log.Println("Error in db: ", result.Error)
		return nil, result.Error
	}

	resourcePreviews := make([]ResourcePreview, len(userResourceUuids))
	for index, resourceUuid := range userResourceUuids {

		resourceMetaData, err := context.RedisClient.GetResourceMetaData(resourceUuid)
		if err != nil {
			log.Println("Error in redis: ", err)
			return nil, err
		}

		resourcePreviews[index] = ResourcePreview{
			Title:        resourceMetaData.Title[:strings.LastIndex(resourceMetaData.Title, ".")],
			Preview:      resourceMetaData.Preview,
			ResourceUuid: resourceUuid,
			Author:       resourceMetaData.Owner,
		}
	}

	return resourcePreviews, nil
}
