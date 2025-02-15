package handlers

import (
	. "client_backend/requests"
	. "client_backend/postgres/models"
	responses "client_backend/responses"
)

const (
	TELEGRAM = "telegram"
	EMAIL    = "email"
)

func GetUserMetaData(userName string, context *HandleContext) (responses.UserMetaData, error) {
	var user User
	result := context.PostgresClient.Database.Limit(1).Select("id, email, telegram").Where("name = ?", userName).Find(&user)
	return responses.UserMetaData{
		UserId:   user.Id,
		Email:    user.Email,
		Telegram: user.Telegram,
	}, result.Error
}

func UpdateUserContacts(request UpdateUserContactsRequest, context *HandleContext) error {
	result := context.PostgresClient.Database.Model(&User{}).Where("id = ?", request.UserId).Update(request.Field, request.Value)
	return result.Error
}

func LikeResource(request LikeResourceRequest, context *HandleContext) error {
	result := context.PostgresClient.Database.Create(&LikedResources{
		UserId: request.UserId,
		ResourceId: request.ResourceUuid,
	})
	return result.Error
}
