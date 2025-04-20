package lib

import (
	"bytes"
	. "client_backend/models"
	. "client_backend/models_for_server"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func Translate(document []byte, language string, context *HandleContext) string {
	if language == "default" {
		return string(document)
	}

	translateRequest := TranslateRequest{
		FolderId:           context.TranslationContext.TranslateFolderId,
		Texts:              []string{string(document)},
		TargetLanguageCode: language,
	}
	jsonRequest, err := json.Marshal(translateRequest)
	if err != nil {
		log.Println(err)
	}

	request, err := http.NewRequest("POST", context.TranslationContext.TranslateUrl, bytes.NewReader(jsonRequest))

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", fmt.Sprintf("Bearer %v", *context.TranslationContext.IAMToken))

	resp, err := context.HttpClient.Do(request)

	if err != nil {
		log.Println(err)
	}

	contentLength := resp.ContentLength
	body2 := make([]byte, contentLength)
	resp.Body.Read(body2)
	log.Println(string(body2))
	var translateResponse TranslateResponse
	err = json.Unmarshal(body2, &translateResponse)
	if err != nil {
		log.Println(err)
		return string(document)
	}

	if len(translateResponse.Translations) == 0 {
		return string(document)
	}

	return translateResponse.Translations[0].Text
}
