package httpserver

import (
	"fmt"
	"log"
	"net/http"
	. "search_backend/elastic_search_client"
)

type SearchServer struct {
	serverImpl ServerImpl
}

func (server *SearchServer) StartServer(port uint64, esClient *ElasticSearchClient) {

	http.HandleFunc("/search", server.serverImpl.Search)
	server.serverImpl.EsClient = esClient

	err := http.ListenAndServe(fmt.Sprintf(":%v", port), nil)
	if err != nil {
		log.Fatal(err)
	}
}
