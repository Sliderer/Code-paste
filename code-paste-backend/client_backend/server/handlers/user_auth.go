package handlers

import (
	. "client_backend/lib"
	. "client_backend/models_for_server"
	. "client_backend/postgres"
	. "client_backend/postgres/models"
	response "client_backend/responses"
)

func CreateUser(userName, email, password string, context *HandleContext) (string, error) {
	hashedPassword := GetHash(password)
	userId := GetHash(userName + email)
	result := Create(
		context.PostgresClient.Database,
		&User{
			Id:       userId,
			Name:     userName,
			Email:    email,
			Password: hashedPassword,
		},
	)

	return userId, result.Error
}

func CheckAccountPassword(userName, password string, context *HandleContext) (response.PredicateResponse, error) {
	hashedPassword := GetHash(password)
	var user User
	result := Find(
		context.PostgresClient.Database.Where("name = ? AND password = ?", userName, hashedPassword).Limit(1),
		&user,
	)

	return response.PredicateResponse{
		Result: result.RowsAffected > 0,
		UserId: user.Id,
	}, result.Error
}

func IsUserExists() {

}
