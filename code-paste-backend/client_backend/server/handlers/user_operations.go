package handlers

import (
	. "client_backend/models_for_server"
	. "client_backend/postgres"
	. "client_backend/postgres/models"
	. "client_backend/requests"
	responses "client_backend/responses"
)

const (
	TELEGRAM = "telegram"
	EMAIL    = "email"
)

func GetUserMetaData(userName string, context *HandleContext) (responses.UserMetaData, error) {
	var user User
	result := Find(
		context.PostgresClient.Database.Limit(1).Select("id, email, telegram").Where("name = ?", userName),
		&user,
	)
	return responses.UserMetaData{
		UserId:   user.Id,
		Email:    user.Email,
		Telegram: user.Telegram,
	}, result.Error
}

func UpdateUserContacts(request UpdateUserContactsRequest, context *HandleContext) error {
	result := Update(
		context.PostgresClient.Database.Model(&User{}).Where("id = ?", request.UserId),
		request.Field, request.Value,
	)
	return result.Error
}

func LikeResource(request LikeResourceRequest, context *HandleContext) error {
	var searchObject LikedResources
	searchResult := Find(
		context.PostgresClient.Database.Where("user_id = ? AND resource_id = ?", request.UserId, request.ResourceUuid).Limit(1),
		&searchObject,
	)

	if searchResult.Error != nil {
		return searchResult.Error
	}

	if searchResult.RowsAffected > 0 {
		result := Update(
			context.PostgresClient.Database.Model(&searchObject),
			"is_active", !searchObject.IsActive,
		)
		return result.Error
	} else {
		result := Create(
			context.PostgresClient.Database,
			&LikedResources{
				UserId:     request.UserId,
				ResourceId: request.ResourceUuid,
			},
		)
		return result.Error
	}
}
