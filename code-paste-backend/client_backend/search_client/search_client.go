package seachclient

import (
	. "client_backend/proto/search"

	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"
)

func GetSearchClient(address string) SearchClient {
	opts := []grpc.DialOption{
		grpc.WithInsecure(),
	}
	conn, err := grpc.Dial(address, opts...)

	if err != nil {
		grpclog.Fatalf("fail to dial: %v", err)
	}
	client := NewSearchClient(conn)
	return client
}
