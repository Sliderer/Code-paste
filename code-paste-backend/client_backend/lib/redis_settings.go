package lib

type RedisSettings struct {
	Address    string `yaml:"address"`
	Password   string `yaml:"password"`
	ClientName string `yaml:"client-name"`
}
