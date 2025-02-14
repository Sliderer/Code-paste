package server

import (
	. "client_backend/lib"
	"client_backend/minio"
	"client_backend/postgres"
	"client_backend/redis"
	. "client_backend/server/handlers"
	"log"
	"net/http"

	redisOriginal "github.com/redis/go-redis/v9"
)

type ClientServer struct {
	serverSettings ServerSettings
	serverImpl     ServerImpl
}

func (server *ClientServer) InitFields() {
	server.serverImpl = ServerImpl{
		Context: &HandleContext{
			MinioClient: &minio.MinioClient{
				Settings: MinioSettings{
					Endpoint:        "84.252.133.175:9000",
					AccessKeyID:     "minioadmin",
					SecretAccessKey: "minioadmin",
					UseSSL:          false,
				},
			},
			RedisClient: &redis.RedisClient{
				Settings: redisOriginal.Options{
					Addr:       "84.252.133.175:6379",
					Password:   "redisadmin",
					ClientName: "redisadmin",
				},
			},
			PostgresClient: &postgres.PostgresClient{
				Settings: PostgresSettings{
					Host:         "84.252.133.175",
					User:         "postgre",
					Password:     "postgre",
					DatabaseName: "CodePaste",
				},
			},
			SessionStore: &SessionStore{
				Key: []byte("some hash"),
			},
		},
	}

	server.serverImpl.Context.Initialize()
}

func (server *ClientServer) StartServer() {

	http.HandleFunc("/upload_resource", server.serverImpl.UploadDocument)
	http.HandleFunc("/get_resource/{resourceUuid}", server.serverImpl.GetResourceData)
	http.HandleFunc("/get_resource_meta/{resourceUuid}", server.serverImpl.GetResourceMetaData)
	http.HandleFunc("/check_password/{resourceUuid}", server.serverImpl.CheckResourcePassword)
	http.HandleFunc("/create_user", server.serverImpl.CreateUser)
	http.HandleFunc("/check_account_password", server.serverImpl.CheckAccountPassword)
	http.HandleFunc("/get_resources", server.serverImpl.GetUserResources)
	http.HandleFunc("/logout", server.serverImpl.Logout)
	http.HandleFunc("/get_user_metadata", server.serverImpl.GetUserMetadata)
	http.HandleFunc("/update_user_contacts", server.serverImpl.UpdateUserContacts)
	http.HandleFunc("/like_resource", server.serverImpl.LikeResource)

	err := http.ListenAndServe(":90", nil)
	if err != nil {
		log.Fatal(err)
	}
}
