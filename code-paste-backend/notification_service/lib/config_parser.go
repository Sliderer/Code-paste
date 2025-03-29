package lib

import (
	"os"

	"gopkg.in/yaml.v2"
)

type EmailNotificatorConfig struct {
	OurAddress    string `yaml:"our_address"`
	ServerAddress string `yaml:"server_address"`
	ServerHost    string `yaml:"server_host"`
	Password      string `yaml:"password"`
	UserId        string `yaml:"user_id"`
}

type TelegramNotificatorConfig struct {
	BotToken string `yaml:"bot_token"`
}

type RedisConfig struct {
	Address    string `yaml:"address"`
	Password   string `yaml:"string"`
	ClientName string `yaml:"client-name"`
}

type ServiceConfig struct {
	SeverPort                 uint64                    `yaml:"server_port"`
	EmailNotificatorConfig    EmailNotificatorConfig    `yaml:"email_notificator"`
	TelegramNotificatorConfig TelegramNotificatorConfig `yaml:"telegram_notificator"`
	RedisConfig               RedisConfig               `yaml:"redis-settings"`
}

type ConfigParser struct {
	ServiceConfig ServiceConfig
}

func (configParser *ConfigParser) ParseConfig(configPath string) {
	yamlFile, err := os.ReadFile(configPath)

	if err != nil {
		panic(err)
	}

	err = yaml.Unmarshal(yamlFile, &configParser.ServiceConfig)
	if err != nil {
		panic(err)
	}
}
