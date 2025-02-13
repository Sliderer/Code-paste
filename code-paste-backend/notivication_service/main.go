package main

import (
	"notification_service/lib"
	"notification_service/notificators"
)

func main() {
	configParser := lib.ConfigParser{}
	configParser.ParseConfig("config/config.yml")
	config := configParser.ServiceConfig

	n := notificators.EmailNotificator{
		OurAddress:    config.EmailNotificatorConfig.OurAddress,
		ServerAddress: config.EmailNotificatorConfig.ServerAddress,
		ServerHost:    config.EmailNotificatorConfig.ServerHost,
		Password:      config.EmailNotificatorConfig.Password,
		UserId:        config.EmailNotificatorConfig.UserId,
	}

	n.Init()
}
