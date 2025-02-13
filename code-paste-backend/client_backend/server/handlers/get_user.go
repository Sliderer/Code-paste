package handlers

import (
	. "client_backend/postgres/models"
)

func GetUserMetaData(userName string, context *HandleContext) (string, error) {
	var user User
	result := context.PostgresClient.Database.Limit(1).Select("id").Where("name = ?", userName).Find(&user)
	return user.Id, result.Error
}
