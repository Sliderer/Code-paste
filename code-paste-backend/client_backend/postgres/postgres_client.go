package postgres

import (
	. "client_backend/lib"
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
