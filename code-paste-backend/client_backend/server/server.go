package server

import (
	. "client_backend/lib"
	"client_backend/minio"
	"client_backend/redis"
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
		minioClient: &minio.MinioClient{
			Settings: MinioSettings{
				Endpoint:        "84.252.133.175:9000",
				AccessKeyID:     "minioadmin",
				SecretAccessKey: "minioadmin",
				UseSSL:          false,
			},
		},
		redisClient: &redis.RedisClient{
			Settings: redisOriginal.Options{
				Addr:       "84.252.133.175:6379",
				Password:   "redisadmin",
				ClientName: "redisadmin",
			},
		},
	}

	server.serverImpl.minioClient.CreateClient()
	server.serverImpl.redisClient.CreateClient()
}

func (server *ClientServer) StartServer() {
	log.Print("Starting server")
	http.HandleFunc("/upload_resource/{userName}/{fileName}/{folderName}", server.serverImpl.UploadDocument)
	http.HandleFunc("/get_resource/{resourceId}", server.serverImpl.GetDocument)
	err := http.ListenAndServe(":90", nil)
	if err != nil {
		log.Fatal(err)
	}
}
