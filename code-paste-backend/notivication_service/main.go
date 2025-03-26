package main

import (
	"notification_service/lib"
	. "notification_service/redis"
	"notification_service/telegram_bot"

	redis "github.com/redis/go-redis/v9"
)

func main() {
	configParser := lib.ConfigParser{}
	configParser.ParseConfig("config/config.yml")
	config := configParser.ServiceConfig

	// n := notificators.EmailNotificator{
	// 	OurAddress:    config.EmailNotificatorConfig.OurAddress,
	// 	ServerAddress: config.EmailNotificatorConfig.ServerAddress,
	// 	ServerHost:    config.EmailNotificatorConfig.ServerHost,
	// 	Password:      config.EmailNotificatorConfig.Password,
	// 	UserId:        config.EmailNotificatorConfig.UserId,
	// }

	// n.Init()

	redisClient := RedisClient{
		Settings: redis.Options{
			Addr:       config.RedisConfig.Address,
			ClientName: config.RedisConfig.ClientName,
			Password:   config.RedisConfig.Password,
		},
	}
	redisClient.CreateClient()
	botFather := telegram_bot.BotFather{}

	startedChan := make(chan bool)
	go botFather.StartBot(config.TelegramNotificatorConfig.BotToken, &redisClient, startedChan)

	<-startedChan

}
