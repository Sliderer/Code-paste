package models

type ServerSettings struct {
	Port                       int              `yaml:"port"`
	SessionKey                 string           `yaml:"session-key"`
	Oauth                      string           `yaml:"oauth"`
	TranslateUrl               string           `yaml:"translate-url"`
	IAMurl                     string           `yaml:"iam-url"`
	TranslateFolderId          string           `yaml:"translate-folder-id"`
	MinioSettings              MinioSettings    `yaml:"minio-settings"`
	PostgresSettings           PostgresSettings `yaml:"postgres-settings"`
	RedisSettings              RedisSettings    `yaml:"redis-settings"`
	NotificationServiceAddress string           `yaml:"notifications_service_address"`
	SearchServiceAddress       string           `yaml:"search_service_address"`
}
