package handlers

import (
	. "client_backend/lib"
	. "client_backend/models"
	. "client_backend/models_for_server"
	. "client_backend/postgres"
	. "client_backend/postgres/models"
	response "client_backend/responses"
	"io"
	"log"
	"sort"
	"strings"

	"gorm.io/gorm"
)

func GetResourceMetaData(userId, resourceUuid, requestSenderName string, context *HandleContext) (*response.ResourceMetaDataResponse, error) {
	resourceMetaData, err := context.RedisClient.GetResourceMetaData(resourceUuid)
	if err != nil {
		return nil, err
	}

	isLiked := false
	if len(userId) > 0 {
		var likedResourceRow LikedResources
		result := Find(
			context.PostgresClient.Database.Where("user_id = ? AND resource_id = ?", userId, resourceUuid),
			&likedResourceRow,
		)
		if result.Error != nil {
			return nil, result.Error
		}

		isLiked = result.RowsAffected > 0 && likedResourceRow.IsActive
	}

	resourcePath := resourceMetaData.Path
	if resourceMetaData.Type == "folder" {
		resourcePath += "/" + resourceMetaData.Title
	}

	return &response.ResourceMetaDataResponse{
		IsPrivate:               resourceMetaData.HasPassword(),
		IsPrivateForCurrentUser: resourceMetaData.Owner != GetUserBucketName(requestSenderName),
		IsLiked:                 isLiked,
		Owner:                   resourceMetaData.Owner,
		OwnerId:                 resourceMetaData.OwnerId,
		Name:                    resourceMetaData.Title,
		Type:                    resourceMetaData.Type,
		HighlightSetting:        resourceMetaData.HighlightSetting,
		Path:                    resourcePath,
	}, nil
}

func GetResourcePreview(resourceUuid string, context *HandleContext) (*ResourcePreview, error) {
	resourceMetaData, err := context.RedisClient.GetResourceMetaData(resourceUuid)
	if err != nil {
		return nil, err
	}

	return &ResourcePreview{
		Title:   resourceMetaData.Title,
		Preview: resourceMetaData.Preview,
		Author:  resourceMetaData.Owner,
	}, nil
}

func ResourcePasswordCheck(resourceUuid string, passwordToCheck string, context *HandleContext) (*response.PredicateResponse, error) {
	hashedPassword := GetHash(passwordToCheck)
	resourceMetaData, err := context.RedisClient.GetResourceMetaData(resourceUuid)
	if err != nil {
		return nil, err
	}
	return &response.PredicateResponse{
		Result: resourceMetaData.Password == hashedPassword,
	}, nil
}

func GetResourceData(resourceUuid string, context *HandleContext) ([]byte, error) {
	resourceMetaData, err := context.RedisClient.GetResourceMetaData(resourceUuid)
	if err != nil {
		return nil, err
	}
	resourceFullPath := resourceMetaData.Path + "/" + resourceMetaData.Title

	bucketName := GetUserBucketName(resourceMetaData.Owner)
	octetData, err := context.MinioClient.DownloadFile(bucketName, resourceFullPath)

	if err != nil {
		return nil, err
	}

	textData, err := io.ReadAll(octetData)
	if err != nil {
		return nil, err
	}

	return textData, nil
}

func GetUserResources(userId string, lookUpPath string, offset int, needOnlyLiked bool, context *HandleContext) ([]*ResourcePreview, error) {
	var userResourceUuids []string
	const resourcesCountLimit = 30
	var result *gorm.DB

	if needOnlyLiked {
		var likedResources []LikedResources
		result = Find(
			context.PostgresClient.Database.Offset(offset).Limit(resourcesCountLimit).Select("resource_id").Where("user_id = ? AND is_active", userId),
			&likedResources,
		)
		for _, value := range likedResources {
			userResourceUuids = append(userResourceUuids, value.ResourceId)
		}
	} else {
		var userResources []UserResources
		result = Find(
			context.PostgresClient.Database.Offset(offset).Limit(resourcesCountLimit).Select("resource_id").Where("user_id = ?", userId),
			&userResources,
		)
		for _, value := range userResources {
			userResourceUuids = append(userResourceUuids, value.ResourceId)
		}

		var userFolders []UserFolders
		result = Find(
			context.PostgresClient.Database.Offset(offset).Limit(resourcesCountLimit).Select("resource_id").Where("user_id = ?", userId),
			&userFolders,
		)
		for _, value := range userFolders {
			userResourceUuids = append(userResourceUuids, value.ResourceId)
		}
	}

	if result.Error != nil {
		log.Println("Error in db: ", result.Error)
		return nil, result.Error
	}

	resourcePreviews := make([]*ResourcePreview, 0)
	for _, resourceUuid := range userResourceUuids {
		resourceMetaData, err := context.RedisClient.GetResourceMetaData(resourceUuid)
		if err != nil {
			log.Println("Error in redis getting user resources: ", err)
			continue
		}

		if resourceMetaData.Path != lookUpPath {
			continue
		}

		resourceTitle := resourceMetaData.Title
		if resourceMetaData.Type == "text" {
			resourceTitle = resourceMetaData.Title[:strings.LastIndex(resourceMetaData.Title, ".")]
		}

		resourcePreviews = append(resourcePreviews, &ResourcePreview{
			Title:        resourceTitle,
			Preview:      resourceMetaData.Preview,
			ResourceUuid: resourceUuid,
			Author:       resourceMetaData.Owner,
			CreationTime: resourceMetaData.CreationTime,
			Type:         resourceMetaData.Type,
		})
	}

	sort.Slice(resourcePreviews, func(i, j int) bool {
		return resourcePreviews[i].CreationTime > resourcePreviews[j].CreationTime
	})
	return resourcePreviews, nil
}
