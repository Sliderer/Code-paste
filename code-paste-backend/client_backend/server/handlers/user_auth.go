package handlers

import (
	. "client_backend/lib"
	. "client_backend/models_for_server"
	. "client_backend/postgres/models"
	response "client_backend/responses"
	"log"
)

func CreateUser(userName, email, password string, context *HandleContext) (string, error) {
	hashedPassword := GetHash(password)
	userId := GetHash(userName + email)
	result := context.PostgresClient.Database.Create(&User{
		Id:       userId,
		Name:     userName,
		Email:    email,
		Password: hashedPassword,
	})
	log.Println("User created")
	return userId, result.Error
}

func CheckAccountPassword(userName, password string, context *HandleContext) (response.PredicateResponse, error) {
	hashedPassword := GetHash(password)
	var user User
	result := context.PostgresClient.Database.Where("name = ? AND password = ?", userName, hashedPassword).Take(&user)

	return response.PredicateResponse{
		Result: result.RowsAffected > 0,
		UserId: user.Id,
	}, result.Error
}

func IsUserExists() {

}
