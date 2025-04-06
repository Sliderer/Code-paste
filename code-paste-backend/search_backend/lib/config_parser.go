package lib

import (
	"os"

	"gopkg.in/yaml.v2"
)

type ElasticSearchConfig struct {
	Address string `yaml:"address"`
}

type ServiceConfig struct {
	SeverPort           uint64              `yaml:"server_port"`
	ElasticSearchConfig ElasticSearchConfig `yaml:"elastic_search"`
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
