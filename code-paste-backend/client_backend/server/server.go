package server

import (
	"client_backend/minio"
	. "client_backend/models"
	. "client_backend/models_for_server"
	. "client_backend/notifications_client"
	"client_backend/postgres"
	. "client_backend/proto/notifications"
	. "client_backend/proto/search"
	"client_backend/redis"
	. "client_backend/search_client"
	"fmt"
	"log"
	"net/http"
	"sync"

	redisOriginal "github.com/redis/go-redis/v9"
)

type ClientServer struct {
	ServerSettings      ServerSettings
	serverImpl          ServerImpl
	HttpClient          *http.Client
	NotificationsClient NotificationsClient
	SearchClient        SearchClient
	IAM                 string
	IAMTokenMutex       sync.Mutex
}

func (server *ClientServer) InitFields() {
	server.HttpClient = &http.Client{}
	server.NotificationsClient = GetNotificationsClient(server.ServerSettings.NotificationServiceAddress)
	server.SearchClient = GetSearchClient(server.ServerSettings.SearchServiceAddress)

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
			TranslationContext: TranslationContext{
				IAMToken:          &server.IAM,
				TranslateFolderId: server.ServerSettings.TranslateFolderId,
				TranslateUrl:      server.ServerSettings.TranslateUrl,
			},
			HttpClient:          server.HttpClient,
			NotificationsClient: &server.NotificationsClient,
			SearchClient:        &server.SearchClient,
		},
	}
	server.serverImpl.Context.Initialize()
}

func (server *ClientServer) SetIAMToken(value string) {
	server.IAMTokenMutex.Lock()
	server.IAM = value
	server.IAMTokenMutex.Unlock()
}

func (server *ClientServer) StartServer() {
	http.HandleFunc("/upload_resource", server.serverImpl.UploadResource)                         // tested
	http.HandleFunc("/get_resource/{resourceUuid}", server.serverImpl.GetResourceData)            // tested
	http.HandleFunc("/get_resource_meta/{resourceUuid}", server.serverImpl.GetResourceMetaData)   // tested
	http.HandleFunc("/get_resource_preview/{resourceUuid}", server.serverImpl.GetResourcePreview) // tested
	http.HandleFunc("/get_resources", server.serverImpl.GetUserResources)                         // tested
	http.HandleFunc("/like_resource", server.serverImpl.LikeResource)                             // tested
	http.HandleFunc("/delete_resource/{resourceUuid}", server.serverImpl.DeleteResource)          // tested
	http.HandleFunc("/check_password/{resourceUuid}", server.serverImpl.CheckResourcePassword)    // tested

	http.HandleFunc("/create_user", server.serverImpl.CreateUser) // tested
	http.HandleFunc("/auth", server.serverImpl.AuthUser)          // tested
	http.HandleFunc("/delete_user", server.serverImpl.DeleteUser) // tested
	http.HandleFunc("/subscribe", server.serverImpl.Subscribe)
	http.HandleFunc("/logout", server.serverImpl.Logout)                           // tested
	http.HandleFunc("/get_user_metadata", server.serverImpl.GetUserMetadata)       // tested
	http.HandleFunc("/update_user_contacts", server.serverImpl.UpdateUserContacts) // tested

	http.HandleFunc("/create_folder", server.serverImpl.CreateFolder)
	http.HandleFunc("/delete_folder/{resourceUuid}", server.serverImpl.DeleteFolder)
	http.HandleFunc("/get_folderUuid", server.serverImpl.GetFolderUuid)

	err := http.ListenAndServe(fmt.Sprintf(":%v", server.ServerSettings.Port), nil)
	if err != nil {
		log.Fatal(err)
	}
}
