package lib

type ConfigParser struct {
	configPath string
}

func (parser *ConfigParser) ValidateJson(configText string) bool {
	return true
}

func (parser *ConfigParser) ParseConfig() (bool, string) {
	configText := ""
	return parser.ValidateJson(configText), configText
}

func ParseConfig(configPath string) *ServerSettings {
	configParser := ConfigParser{configPath: configPath}
	isParsed, result := configParser.ParseConfig()

	if isParsed {
		panic("Can not parse config")
	}
	return &ServerSettings{port: atoi(result)}
}
