package lib

type MinioSettings struct {
	Endpoint        string `yaml:"endpoint"`
	AccessKeyID     string `yaml:"access-key-id"`
	SecretAccessKey string `yaml:"secret-access-key"`
	UseSSL          bool   `yaml:"use-ssl"`
}
