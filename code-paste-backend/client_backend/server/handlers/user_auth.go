package handlers

import (
	. "client_backend/lib"
	. "client_backend/models_for_server"
	. "client_backend/postgres"
	. "client_backend/postgres/models"
	"client_backend/requests"
	response "client_backend/responses"
)

func CreateUserHandler(request requests.CreateUser, context *HandleContext) (string, error) {
	hashedPassword := GetHash(request.Password)
	userId := GetHash(request.UserName + request.Email)
	result := Create(
		context.PostgresClient.Database,
		&User{
			Id:       userId,
			Name:     request.UserName,
			Email:    request.Email,
			Password: hashedPassword,
		},
	)

	if result.Error != nil {
		return "", result.Error
	}

	return userId, result.Error
}

func CheckAccountPassword(request requests.AuthUser, context *HandleContext) (*response.PredicateResponse, error) {
	hashedPassword := GetHash(request.Password)
	var user User
	result := Find(
		context.PostgresClient.Database.Where("name = ? AND password = ?", request.UserName, hashedPassword).Limit(1),
		&user,
	)

	if result.Error != nil {
		return nil, result.Error
	}

	return &response.PredicateResponse{
		Result: result.RowsAffected > 0,
		UserId: user.Id,
	}, result.Error
}

func DeleteUserHandler(request requests.DeleteUser, context *HandleContext) (*response.PredicateResponse, error) {
	hashedPassword := GetHash(request.Password)
	user := User{
		Id:       request.UserId,
		Password: hashedPassword,
	}

	result := Delete(
		context.PostgresClient.Database.Unscoped(),
		&user,
	)

	if result.Error != nil {
		return nil, result.Error
	}

	return &response.PredicateResponse{
		Result: result.RowsAffected > 0,
		UserId: request.UserId,
	}, result.Error
}
