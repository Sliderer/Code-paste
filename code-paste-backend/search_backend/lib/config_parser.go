package lib

import (
	"os"

	"gopkg.in/yaml.v2"
)

type ElasticSearchConfig struct {
	Address  string `yaml:"address"`
	Login    string `yaml:"login"`
	Password string `yaml:"password"`
}

type ServiceConfig struct {
	GrpcSeverPort       uint64              `yaml:"grpc_server_port"`
	HttpSeverPort       uint64              `yaml:"http_server_port"`
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
