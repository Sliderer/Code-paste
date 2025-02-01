package handlers

import (
	. "client_backend/kafka"
	. "client_backend/lib"
	. "client_backend/minio"
	. "client_backend/postgres"
	. "client_backend/redis"
)

type HandleContext struct {
	MinioClient    *MinioClient
	RedisClient    *RedisClient
	KafkaClient    *KafkaClient
	PostgresClient *PostgresClient
	SessionStore   *SessionStore
}

func (context *HandleContext) Initialize() {
	context.SessionStore.CreateCookieStore()
	context.MinioClient.CreateClient()
	context.RedisClient.CreateClient()
	context.PostgresClient.OpenConnection()
}
