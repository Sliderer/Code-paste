package models

type Translation struct {
	Text string `json:"text"`
}

type TranslateResponse struct {
	Translations []Translation `json:"translations"`
}
