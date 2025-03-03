package redis

import (
	. "client_backend/models"
	"context"
	"encoding/json"
	"log"
	"time"

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

func (redisClient *RedisClient) UploadResourceMetaData(uuid string, ttl int, metaData *ResourceMetaData) error {
	err := redisClient.Client.Set(context.Background(), uuid, metaData, 0)
	if err.Err() != nil {
		return err.Err()
	}

	if ttl != 0 {
		err := redisClient.Client.Expire(context.Background(), uuid, time.Duration(ttl)*time.Hour)
		if err.Err() != nil {
			return err.Err()
		}
	}
	return err.Err()
}

func (redisClient *RedisClient) GetResourceMetaData(uuid string) (ResourceMetaData, error) {
	var data ResourceMetaData
	log.Println(uuid)
	resultString := redisClient.Client.Get(context.Background(), uuid).Val()
	log.Println(resultString)
	err := json.Unmarshal([]byte(resultString), &data)

	return data, err
}
