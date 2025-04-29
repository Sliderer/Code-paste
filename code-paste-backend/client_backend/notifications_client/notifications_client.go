package notificationsclient

import (
	. "client_backend/proto/notifications"

	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"
)

func GetNotificationsClient(address string) NotificationsClient {
	opts := []grpc.DialOption{
		grpc.WithInsecure(),
	}
	conn, err := grpc.Dial(address, opts...)

	if err != nil {
		grpclog.Fatalf("fail to dial: %v", err)
	}
	client := NewNotificationsClient(conn)
	return client
}
