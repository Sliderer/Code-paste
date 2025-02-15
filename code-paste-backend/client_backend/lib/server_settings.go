package lib

type ServerSettings struct {
	Port             int              `yaml:"port"`
	SessionKey       string           `yaml:"session-key"`
	MinioSettings    MinioSettings    `yaml:"minio-settings"`
	PostgresSettings PostgresSettings `yaml:"postgres-settings"`
	RedisSettings    RedisSettings    `yaml:"redis-settings"`
}
