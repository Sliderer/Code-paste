package minio

import (
	"bytes"
	. "client_backend/models"
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

	bucketExistsChan := make(chan struct {
		bool
		error
	})
	go func() {
		result, err := minioClient.client.BucketExists(context.Background(), bucketName)
		bucketExistsChan <- struct {
			bool
			error
		}{result, err}
	}()

	bucketExistsResult := <-bucketExistsChan
	if bucketExistsResult.error != nil || bucketExistsResult.bool {
		return bucketExistsResult.error
	}

	makeBuckerChan := make(chan error)
	go func() {
		makeBuckerChan <- minioClient.client.MakeBucket(context.Background(), bucketName, minio.MakeBucketOptions{})
	}()

	return <-makeBuckerChan
}

func (minioClient *MinioClient) UploadFile(userName, fileName, data string, dataSize int64) error {
	minioClient.CreateBucketIfNotExists(userName)
	textBytes := []byte(data)

	uploadingChan := make(chan error)

	go func() {
		_, err := minioClient.client.PutObject(context.Background(), userName, fileName, bytes.NewReader(textBytes), int64(len(textBytes)), minio.PutObjectOptions{ContentType: "application/octet-stream"})
		uploadingChan <- err
	}()

	return <-uploadingChan
}

func (minioClient *MinioClient) DownloadFile(bucketName, filePath string) (io.Reader, error) {
	options := minio.GetObjectOptions{}
	options.Header().Add("Content-Type", "plain/text")

	getObjectChan := make(chan struct {
		*minio.Object
		error
	})

	go func() {
		result, err := minioClient.client.GetObject(context.Background(), bucketName, filePath, options)
		getObjectChan <- struct {
			*minio.Object
			error
		}{result, err}
	}()

	getObjectResult := <-getObjectChan
	return getObjectResult.Object, getObjectResult.error
}

func (minioClient *MinioClient) DeleteFile(bucketName, filePath string) error {
	options := minio.RemoveObjectOptions{}
	removeObjectChan := make(chan error)
	go func() {
		removeObjectChan <- minioClient.client.RemoveObject(context.Background(), bucketName, filePath, options)
	}()

	return <-removeObjectChan
}
