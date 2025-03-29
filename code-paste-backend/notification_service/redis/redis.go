package redis

import (
	"context"
	"log"
	"strconv"

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

func (redisClient *RedisClient) SaveUserInfo(userName string, chatId int64) error {
	err := redisClient.Client.Set(context.Background(), "user_info:"+userName, chatId, 0)
	return err.Err()
}

func (redisClient *RedisClient) GetUserInfo(userName string) (int64, error) {
	
	result := redisClient.Client.Get(context.Background(), "user_info:"+userName)
	chatId, _ := strconv.ParseInt(result.Val(), 10, 64)
	return chatId, result.Err()
}
