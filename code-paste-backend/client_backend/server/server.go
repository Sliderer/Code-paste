package server

import (
	. "client_backend/lib"
	"client_backend/minio"
	"client_backend/postgres"
	"client_backend/redis"
	. "client_backend/server/handlers"
	"fmt"
	"log"
	"net/http"

	redisOriginal "github.com/redis/go-redis/v9"
)

type ClientServer struct {
	ServerSettings ServerSettings
	serverImpl     ServerImpl
}

func (server *ClientServer) InitFields() {
	server.serverImpl = ServerImpl{
		Context: &HandleContext{
			MinioClient: &minio.MinioClient{
				Settings: server.ServerSettings.MinioSettings,
			},
			RedisClient: &redis.RedisClient{
				Settings: redisOriginal.Options{
					Addr:       server.ServerSettings.RedisSettings.Address,
					Password:   server.ServerSettings.RedisSettings.Password,
					ClientName: server.ServerSettings.RedisSettings.ClientName,
				},
			},
			PostgresClient: &postgres.PostgresClient{
				Settings: server.ServerSettings.PostgresSettings,
			},
			SessionStore: &SessionStore{
				Key: []byte(server.ServerSettings.SessionKey),
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

	log.Println(server.ServerSettings.Port)
	err := http.ListenAndServe(fmt.Sprintf(":%v", server.ServerSettings.Port), nil)
	if err != nil {
		log.Fatal(err)
	}
}
