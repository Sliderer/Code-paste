package handlers

import (
	. "client_backend/models_for_server"
	. "client_backend/postgres"
	. "client_backend/postgres/models"
	. "client_backend/requests"
	responses "client_backend/responses"
	"log"
)

const (
	TELEGRAM = "telegram"
	EMAIL    = "email"
)

func GetUserMetaData(userName string, context *HandleContext) (*responses.UserMetaData, error) {
	var user User
	result := Find(
		context.PostgresClient.Database.Limit(1).Select("id, email, telegram").Where("name = ?", userName),
		&user,
	)

	if result.Error != nil {
		return nil, result.Error
	}

	return &responses.UserMetaData{
		UserId:   user.Id,
		Email:    user.Email,
		Telegram: user.Telegram,
	}, result.Error
}

func UpdateUserContacts(request UpdateUserContactsRequest, session *ClientSession, context *HandleContext) error {
	result := Update(
		context.PostgresClient.Database.Model(&User{}).Where("id = ?", session.GetUserId()),
		request.Field, request.Value,
	)
	return result.Error
}

func LikeResource(request LikeResourceRequest, session *ClientSession, context *HandleContext) error {
	userId := session.GetUserId()

	var searchObject LikedResources
	searchResult := Find(
		context.PostgresClient.Database.Where("user_id = ? AND resource_id = ?", userId, request.ResourceUuid).Limit(1),
		&searchObject,
	)

	if searchResult.Error != nil {
		return searchResult.Error
	}

	log.Println(searchObject.UserId, userId)
	if searchObject.UserId == userId {
		result := Update(
			context.PostgresClient.Database.Model(&searchObject),
			"is_active", !searchObject.IsActive,
		)
		return result.Error
	} else {
		result := Create(
			context.PostgresClient.Database,
			&LikedResources{
				UserId:     userId,
				ResourceId: request.ResourceUuid,
			},
		)
		return result.Error
	}
}

func Subscribe(subscriberId, publisherId string, context *HandleContext) error {
	result := Create(
		context.PostgresClient.Database,
		&Subscribtions{
			SubscriberId: subscriberId,
			PublisherId:  publisherId,
		},
	)

	if result.Error != nil {
		log.Println("Error creating a subscribtion: ", result.Error)
	}

	return result.Error
}
