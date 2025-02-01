package handlers

import (
	. "client_backend/lib"
	. "client_backend/models"
	. "client_backend/postgres/models"
	response "client_backend/responses"
	"io"
	"log"
	"strings"
)

func GetResourceMetaData(resourceUuid string, context *HandleContext) response.ResourceMetaDataResponse {
	resourceMetaData := context.RedisClient.GetResourceMetaData(resourceUuid)

	return response.ResourceMetaDataResponse{
		IsPrivate: resourceMetaData.HasPassword(),
		Owner:     resourceMetaData.Owner,
		Name:      resourceMetaData.Title,
	}
}

func ResourcePasswordCheck(resourceUuid string, passwordToCheck string, context *HandleContext) response.PredicateResponse {
	hashedPassword := GetHash(passwordToCheck)
	resourceMetaData := context.RedisClient.GetResourceMetaData(resourceUuid)

	return response.PredicateResponse{
		Result: resourceMetaData.Password == hashedPassword,
	}
}

func GetResourceData(resourceUuid string, context *HandleContext) ([]byte, error) {
	resourceMetaData := context.RedisClient.GetResourceMetaData(resourceUuid)
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

func GetUserResources(userId string, offset int, context *HandleContext) ([]ResourcePreview, error) {
	var userResources []UserResources

	result := context.PostgresClient.Database.Offset(offset).Limit(1).Select("resource_id").Where("user_id = ?", userId).Find(&userResources)

	if result.Error != nil {
		return nil, result.Error
	}

	resourcePreviews := make([]ResourcePreview, len(userResources))
	for index, resource := range userResources {
		log.Println("Found resource: ", resource.ResourceId)
		resourceMetaData := context.RedisClient.GetResourceMetaData(resource.ResourceId)
		resourcePreviews[index] = ResourcePreview{
			Title:   resourceMetaData.Title[:strings.LastIndex(resourceMetaData.Title, ".")],
			Preview: resourceMetaData.Preview,
		}
	}

	return resourcePreviews, nil
}
