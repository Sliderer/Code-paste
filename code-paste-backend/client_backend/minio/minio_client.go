package minio

import (
	. "client_backend/lib"
	"context"
	"fmt"
	"io"
	"log"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

type MinioClient struct {
	Settings MinioSettings
	Client   *minio.Client
}

func (minioClient *MinioClient) CreateClient() error {
	var err error
	minioClient.Client, err = minio.New(minioClient.Settings.Endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(minioClient.Settings.AccessKeyID, minioClient.Settings.SecretAccessKey, ""),
		Secure: minioClient.Settings.UseSSL,
	})

	if err != nil {
		log.Fatalln(err)
	}

	minioClient.CreateBucketIfNotExists()

	return nil
}

func (minioClient *MinioClient) CreateBucketIfNotExists() error {

}

func (minioClient *MinioClient) UploadFile(userName, fileName string, data io.Reader, dataSize int64) error {
	info, err := minioClient.Client.PutObject(context.Background(), userName, fileName, data, dataSize, minio.PutObjectOptions{ContentType: "application/octet-stream"})
	fmt.Println(info)
	return err
}

func (minioClient *MinioClient) DownloadFile() error {
	return nil
}
