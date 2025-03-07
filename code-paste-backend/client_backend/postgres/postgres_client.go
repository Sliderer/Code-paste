package postgres

import (
	. "client_backend/models"
	. "client_backend/postgres/models"
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type PostgresClient struct {
	Settings PostgresSettings
	Database *gorm.DB
}

func (postgresClient *PostgresClient) OpenConnection() {
	settings := &postgresClient.Settings
	dsn := fmt.Sprintf("host=%s user=%s dbname=%s password=%s sslmode=disable", settings.Host, settings.User, settings.DatabaseName, settings.Password)
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalln(err)
	}
	database.AutoMigrate(&User{}, &Subscribtions{}, &UserResources{}, &LikedResources{})
	postgresClient.Database = database
}

func Find[T any](tx *gorm.DB, object *T) *gorm.DB {
	resultChan := make(chan *gorm.DB)

	go func() {
		resultChan <- tx.Find(&object)
	}()

	return <-resultChan
}

func Create[T any](tx *gorm.DB, object *T) *gorm.DB {
	resultChan := make(chan *gorm.DB)

	go func() {
		resultChan <- tx.Create(&object)
	}()

	return <-resultChan
}

func Update[T any](tx *gorm.DB, key string, value T) *gorm.DB {
	resultChan := make(chan *gorm.DB)

	go func() {
		resultChan <- tx.Update(key, value)
	}()

	return <-resultChan
}

func Delete[T any](tx *gorm.DB, object *T) *gorm.DB {
	resultChan := make(chan *gorm.DB)

	go func() {
		resultChan <- tx.Delete(object)
	}()

	return <-resultChan
}
