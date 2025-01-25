package handlers

import (
	. "client_backend/lib"
	. "client_backend/postgres"
	. "client_backend/postgres/models"
	response "client_backend/responses"
	"log"
)

func CreateUser(userName, email, password string, postgresClient *PostgresClient) error {
	log.Println(userName)
	hashedPassword := GetHash(password)
	userId := GetHash(userName + email)
	result := postgresClient.Database.Create(&User{
		Id:       userId,
		Name:     userName,
		Email:    email,
		Password: hashedPassword,
	})

	return result.Error
}

func CheckAccountPassword(userName, password string, postgresClient *PostgresClient) (response.PredicateResponse, error) {
	hashedPassword := GetHash(password)
	result := postgresClient.Database.Take(&User{
		Name:     userName,
		Password: hashedPassword,
	})

	return response.PredicateResponse{
		Result: result.RowsAffected > 0,
	}, result.Error
}

func IsUserExists() {

}
