package minio

import (
	"bytes"
	. "client_backend/lib"
	"context"
	"io"
	"log"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

type MinioClient struct {
	Settings MinioSettings
	client   *minio.Client
}

func (minioClient *MinioClient) CreateClient() error {
	var err error
	minioClient.client, err = minio.New(minioClient.Settings.Endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(minioClient.Settings.AccessKeyID, minioClient.Settings.SecretAccessKey, ""),
		Secure: minioClient.Settings.UseSSL,
	})

	if err != nil {
		log.Fatalln(err)
	}

	return nil
}

func (minioClient *MinioClient) CreateBucketIfNotExists(bucketName string) error {
	result, err := minioClient.client.BucketExists(context.Background(), bucketName)
	if err != nil || result {
		return err
	}

	err = minioClient.client.MakeBucket(context.Background(), bucketName, minio.MakeBucketOptions{})

	return err
}

func (minioClient *MinioClient) UploadFile(userName, fileName, data string, dataSize int64, result chan error) {
	go minioClient.CreateBucketIfNotExists(userName)
	_, err := minioClient.client.PutObject(context.Background(), userName, fileName, bytes.NewReader([]byte(data)), dataSize, minio.PutObjectOptions{ContentType: "application/octet-stream"})
	result <- err
}

func (minioClient *MinioClient) DownloadFile(bucketName, filePath string) (io.Reader, error) {
	options := minio.GetObjectOptions{}
	options.Header().Add("Content-Type", "plain/text")
	result, err := minioClient.client.GetObject(context.Background(), bucketName, filePath, options)
	if err != nil {
		log.Print(err)
	}
	// data := make([]byte, 1024)

	// result.Read(data)
	// log.Println("Data: ", string(data))
	log.Print(result.Stat())
	return result, nil
}
