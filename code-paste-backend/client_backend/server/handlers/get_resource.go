package handlers

import (
	. "client_backend/lib"
	. "client_backend/minio"
	. "client_backend/redis"
	response "client_backend/responses"
	"io"
	"log"
)

func GetResourceMetaData(resourceUuid string, redisClient *RedisClient) response.ResourceMetaData {
	resourceMetaData := redisClient.GetResourceMetaData(resourceUuid)

	return response.ResourceMetaData{
		IsPrivate: resourceMetaData.HasPassword(),
		Owner:     resourceMetaData.Owner,
		Name:      resourceMetaData.Name,
	}
}

func ResourcePasswordCheck(resourceUuid string, passwordToCheck string, redisClient *RedisClient) response.PredicateResponse {
	hashedPassword := GetHash(passwordToCheck)
	resourceMetaData := redisClient.GetResourceMetaData(resourceUuid)

	return response.PredicateResponse{
		Result: resourceMetaData.Password == hashedPassword,
	}
}

func GetResourceData(resourceUuid string, redisClient *RedisClient, minioClient *MinioClient) ([]byte, error) {
	resourceMetaData := redisClient.GetResourceMetaData(resourceUuid)
	resourceFullPath := resourceMetaData.Path + "/" + resourceMetaData.Name
	log.Println(resourceFullPath)
	octetData, err := minioClient.DownloadFile(resourceMetaData.Owner, resourceFullPath)

	if err != nil {
		return nil, err
	}

	textData, err := io.ReadAll(octetData)
	if err != nil {
		return nil, err
	}

	return textData, nil
}
