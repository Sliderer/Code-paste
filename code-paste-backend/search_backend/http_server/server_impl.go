package httpserver

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	. "search_backend/elastic_search_client"

	// . "search_backend/models"
	"strings"
)

type ServerImpl struct {
	EsClient *ElasticSearchClient
}

func SetDefaultHeaders(w http.ResponseWriter, allowedHeaders string) http.ResponseWriter {
	w.Header().Set("Content-Type", "*")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Max-Age", "15")
	w.Header().Set("Access-Control-Allow-Headers", allowedHeaders)
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Methods", "*")

	return w
}

func (serverImpl *ServerImpl) Search(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, password")

	if r.Method == "GET" {
		text := r.URL.Query().Get("text")
		decodedText, err := url.QueryUnescape(text)

		if err != nil {
			log.Println(err)
		}

		query := fmt.Sprintf(
			`{ "query":
			{
				"match": {
					"text": "%v"
				} 
			} 
		}`, decodedText)

		result, err := serverImpl.EsClient.Client.Search(
			serverImpl.EsClient.Client.Search.WithIndex("text_resources"),
			serverImpl.EsClient.Client.Search.WithBody(strings.NewReader(query)),
		)

		if err != nil {
			log.Println(err)
		}

		var mapResp map[string]interface{}
		json.NewDecoder(result.Body).Decode(&mapResp)
		if err != nil {
			log.Println(err)
		}

		hits := mapResp["hits"].(map[string]interface{})["hits"].([]interface{})

		resource_ids := make([]string, 0)
		for _, hit := range hits {
			doc := hit.(map[string]interface{})
			resource_ids = append(resource_ids, doc["_id"].(string))
		}

		data, _ := json.Marshal(resource_ids)

		w.WriteHeader(http.StatusOK)
		w.Write(data)
	} else {
		w.WriteHeader(http.StatusOK)
	}
}
