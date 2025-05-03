package grpc_server

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net"
	. "search_backend/elastic_search_client"
	. "search_backend/lib"
	. "search_backend/models"
	pb "search_backend/proto/search"
	"strings"

	"google.golang.org/grpc"
)

type GrpcServer struct {
	pb.UnsafeSearchServer
	EsClient *ElasticSearchClient
}

func StartServer(port uint64, esClient *ElasticSearchClient) {
	s := grpc.NewServer()
	server := GrpcServer{
		EsClient: esClient,
	}
	pb.RegisterSearchServer(s, server)
	l, err := net.Listen("tcp", fmt.Sprintf(":%v", port))
	if err != nil {
		log.Fatal(err)
	}

	if err := s.Serve(l); err != nil {
		log.Fatal(err)
	}
}

func (server GrpcServer) UploadInIndex(ctx context.Context, request *pb.UploadInIndexRequest) (*pb.UploadInIndexResponse, error) {
	decodedText, _ := DecompressText(request.Data)
	document := TextResource{
		Text: string(decodedText),
	}
	data, _ := json.Marshal(document)

	result, err := server.EsClient.Client.Index("text_resources", bytes.NewReader(data), server.EsClient.Client.Index.WithDocumentID(request.ResourceUuid))

	if err != nil {
		log.Println("Indexing error: " + err.Error())
	} else {
		log.Println("Indexing result: " + result.Status())
	}

	return &pb.UploadInIndexResponse{}, nil
}

func (server GrpcServer) SearchResources(ctx context.Context, request *pb.SearchResourcesRequest) (*pb.SearchResourcesResponse, error) {

	query := fmt.Sprintf(`{ "query":
		{
			"match": {
				"text": %v
			} 
		} 
	}`, request.SearchText)

	result, _ := server.EsClient.Client.Search(
		server.EsClient.Client.Search.WithIndex("my_index"),
		server.EsClient.Client.Search.WithBody(strings.NewReader(query)),
	)
	log.Println(result)
	return &pb.SearchResourcesResponse{}, nil
}
