package redis

import (
	"context"

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

func (redisClient *RedisClient) UploadResourceData(uuid, path string) {
	redisClient.Client.Set(context.Background(), uuid, path, 0)
}

func (redisClient *RedisClient) GetResourcePath(uuid string) string {
	return redisClient.Client.Get(context.Background(), uuid).Val()
}
