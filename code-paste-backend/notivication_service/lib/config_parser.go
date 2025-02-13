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

type ServiceConfig struct {
	EmailNotificatorConfig EmailNotificatorConfig `yaml:"email_notificator"`
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
