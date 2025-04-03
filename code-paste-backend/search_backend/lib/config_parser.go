package lib

import (
	"os"

	"gopkg.in/yaml.v2"
)

type ServiceConfig struct {
	SeverPort uint64 `yaml:"server_port"`
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
