package elasticsearchclient

import (
	"log"

	"github.com/elastic/go-elasticsearch/v7"
)

type ElasticSearchClient struct {
	Client *elasticsearch.Client
}

func (client *ElasticSearchClient) Connect() {
	cfg := elasticsearch.Config{
		Addresses: []string{
			"http://51.250.41.128:9200",
		},
		Password: "elastic",
		Username: "elastic",
	}
	log.Println("Connecting")
	es, err := elasticsearch.NewClient(cfg)

	if err != nil {
		log.Fatal(err)
	}

	client.Client = es
	log.Println("Connected")
}
