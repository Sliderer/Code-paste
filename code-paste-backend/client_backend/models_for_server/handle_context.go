package models_for_server

import (
	. "client_backend/minio"
	. "client_backend/postgres"
	. "client_backend/proto/notifications"
	. "client_backend/proto/search"
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
	PostgresClient      *PostgresClient
	SessionStore        *SessionStore
	HttpClient          *http.Client
	NotificationsClient *NotificationsClient
	SearchClient        *SearchClient
	TranslationContext  TranslationContext
}

func (context *HandleContext) Initialize() {
	context.SessionStore.CreateCookieStore()
	context.MinioClient.CreateClient()
	context.RedisClient.CreateClient()
	context.PostgresClient.OpenConnection()
}
