package handlers

import (
	. "client_backend/lib"
	. "client_backend/minio"
	. "client_backend/redis"
	. "client_backend/responses"
	"io"
)

func ResourceMetaDataGet(resourceUuid string, redisClient *RedisClient) ResourceMetaData {
	resourceMetaData := redisClient.GetResourceMetaData(resourceUuid)

	return ResourceMetaData{
		IsPrivate: resourceMetaData.HasPassword(),
		Owner:     resourceMetaData.Owner,
	}
}

func ResourcePasswordCheckGet(resourceUuid string, passwordToCheck string, redisClient *RedisClient) PredicateResponse {
	hashedPassword := GetHash(passwordToCheck)
	resourceMetaData := redisClient.GetResourceMetaData(resourceUuid)

	return PredicateResponse{
		Result: resourceMetaData.Password == hashedPassword,
	}
}

func ResourceDataGet(resourceUuid string, redisClient *RedisClient, minioClient *MinioClient) ([]byte, error) {
	resourceMetaData := redisClient.GetResourceMetaData(resourceUuid)
	octetData, err := minioClient.DownloadFile(resourceMetaData.Owner, resourceMetaData.Path)

	if err != nil {
		return nil, err
	}

	textData, err := io.ReadAll(octetData)
	if err != nil {
		return nil, err
	}

	return textData, nil
}
