package lib

import (
	"os"

	"gopkg.in/yaml.v2"
)

type ConfigParser struct{}

func (configParser *ConfigParser) ParseConfig(configPath string) ServerSettings {
	yamlFile, err := os.ReadFile(configPath)

	if err != nil {
		panic(err)
	}

	var serverSettings ServerSettings
	err = yaml.Unmarshal(yamlFile, &serverSettings)
	if err != nil {
		panic(err)
	}

	return serverSettings
}
