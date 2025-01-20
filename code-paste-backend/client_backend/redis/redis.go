package redis

import (
	. "client_backend/models"
	"context"
	"encoding/json"
	"log"

	redis "github.com/redis/go-redis/v9"
)

type RedisClient struct {
	Settings redis.Options
	Client   *redis.Client
}

func (redisClient *RedisClient) CreateClient() error {
	redisClient.Client = redis.NewClient(&redisClient.Settings)
	return nil
}

func (redisClient *RedisClient) UploadResourceMetaData(uuid string, metaData ResourceMetaData) {
	redisClient.Client.Set(context.Background(), uuid, metaData, 0)
}

func (redisClient *RedisClient) GetResourceMetaData(uuid string) ResourceMetaData {
	var data ResourceMetaData
	err := json.Unmarshal([]byte(redisClient.Client.Get(context.Background(), uuid).Val()), &data)

	if err != nil {
		log.Println(err)
	}
	return data
}
