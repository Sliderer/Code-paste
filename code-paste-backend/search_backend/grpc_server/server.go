package grpc_server

import (
	"context"
	"fmt"
	"log"
	"net"
	pb "search_backend/proto/search"

	"google.golang.org/grpc"
)

type GrpcServer struct {
	pb.UnsafeSearchServer
}

func StartServer(port uint64) {
	s := grpc.NewServer()
	pb.RegisterSearchServer(s, GrpcServer{})
	l, err := net.Listen("tcp", fmt.Sprintf(":%v", port))
	if err != nil {
		log.Fatal(err)
	}

	if err := s.Serve(l); err != nil {
		log.Fatal(err)
	}
}

func (server GrpcServer) UploadInIndex(ctx context.Context, request *pb.UploadInIndexRequest) (*pb.UploadInIndexResponse, error) {
	return nil, nil
}

func (server GrpcServer) SearchResources(ctx context.Context, request *pb.SearchResourcesRequest) (*pb.SearchResourcesResponse, error) {
	return nil, nil
}
