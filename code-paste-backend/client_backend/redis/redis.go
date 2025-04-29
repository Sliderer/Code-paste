package redis

import (
	. "client_backend/models"
	"context"
	"encoding/json"
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
	errorChan := make(chan *redis.StatusCmd)
	go func() {
		errorChan <- redisClient.Client.Set(context.Background(), uuid, metaData, 0)
	}()

	err := <-errorChan
	if err.Err() != nil {
		return err.Err()
	}

	if ttl != 0 {
		errorChan := make(chan *redis.BoolCmd)
		go func() {
			errorChan <- redisClient.Client.Expire(context.Background(), uuid, time.Duration(ttl)*time.Hour)
		}()

		err := <-errorChan
		if err.Err() != nil {
			return err.Err()
		}
	}
	return err.Err()
}

func (redisClient *RedisClient) GetResourceMetaData(uuid string) (ResourceMetaData, error) {
	var data ResourceMetaData

	resultChan := make(chan string)
	go func() {
		resultChan <- redisClient.Client.Get(context.Background(), uuid).Val()
	}()

	resultString := <-resultChan
	err := json.Unmarshal([]byte(resultString), &data)

	return data, err
}

func (redisClient *RedisClient) DeleteResourceMetaData(uuid string) error {
	resultChan := make(chan *redis.IntCmd)
	go func() {
		resultChan <- redisClient.Client.Del(context.Background(), uuid)
	}()

	result := <-resultChan
	return result.Err()
}
