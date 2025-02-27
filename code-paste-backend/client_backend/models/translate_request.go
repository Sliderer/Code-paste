package models

type TranslateRequest struct {
	FolderId           string   `json:"folderId"`
	Texts              []string `json:"texts"`
	TargetLanguageCode string   `json:"targetLanguageCode"`
}
