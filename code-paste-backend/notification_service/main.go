package main

import (
	"notification_service/grpc_server"
	"notification_service/lib"
	"notification_service/notificators"
	. "notification_service/redis"

	redis "github.com/redis/go-redis/v9"
)

func main() {
	configParser := lib.ConfigParser{}
	configParser.ParseConfig("config/production_config.yml")
	config := configParser.ServiceConfig

	emailNotificator := notificators.EmailNotificator{
		OurAddress:    config.EmailNotificatorConfig.OurAddress,
		ServerAddress: config.EmailNotificatorConfig.ServerAddress,
		ServerHost:    config.EmailNotificatorConfig.ServerHost,
		Password:      config.EmailNotificatorConfig.Password,
		UserId:        config.EmailNotificatorConfig.UserId,
	}

	emailNotificator.Init()

	redisClient := RedisClient{
		Settings: redis.Options{
			Addr:       config.RedisConfig.Address,
			ClientName: config.RedisConfig.ClientName,
			Password:   config.RedisConfig.Password,
		},
	}
	redisClient.CreateClient()
	telegramNoficator := notificators.TelegramNotificator{}

	startedChan := make(chan bool)
	go telegramNoficator.StartBot(config.TelegramNotificatorConfig.BotToken, &redisClient, startedChan)

	<-startedChan

	grpc_server.StartServer(config.SeverPort, &emailNotificator, &telegramNoficator)
}
