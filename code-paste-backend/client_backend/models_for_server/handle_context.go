package models_for_server

import (
	. "client_backend/kafka"
	. "client_backend/minio"
	. "client_backend/postgres"
	. "client_backend/proto/notifications"
	. "client_backend/redis"
	"net/http"
)

type TranslationContext struct {
	IAMToken          *string
	TranslateFolderId string
	TranslateUrl      string
}

type HandleContext struct {
	MinioClient         *MinioClient
	RedisClient         *RedisClient
	KafkaClient         *KafkaClient
	PostgresClient      *PostgresClient
	SessionStore        *SessionStore
	HttpClient          *http.Client
	NotificationsClient *NotificationsClient
	TranslationContext  TranslationContext
}

func (context *HandleContext) Initialize() {
	context.SessionStore.CreateCookieStore()
	context.MinioClient.CreateClient()
	context.RedisClient.CreateClient()
	context.PostgresClient.OpenConnection()
}
