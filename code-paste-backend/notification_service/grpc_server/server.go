package grpc_server

import (
	"context"
	"fmt"
	"log"
	"net"
	. "notification_service/notificators"
	pb "notification_service/proto/notifications"

	"google.golang.org/grpc"
)

type GrpcServer struct {
	pb.UnsafeNotificationsServer
	emailNotificator  *EmailNotificator
	telegramNoficator *TelegramNotificator
}

func (server GrpcServer) SendNotification(ctx context.Context, request *pb.SendNotificationRequest) (*pb.SendNotificationResponse, error) {
	var notificator INotificator

	switch request.Type {
	case pb.NotificationType_Email:
		notificator = server.emailNotificator
	case pb.NotificationType_Telegram:
		notificator = server.telegramNoficator
	}

	notificator.Notificate(request.Sender, request.Reciever)
	return &pb.SendNotificationResponse{}, nil
}

func StartServer(port uint64, emailNotificator *EmailNotificator, telegramNoficator *TelegramNotificator) {
	s := grpc.NewServer()
	pb.RegisterNotificationsServer(s, GrpcServer{
		emailNotificator:  emailNotificator,
		telegramNoficator: telegramNoficator,
	})
	l, err := net.Listen("tcp", fmt.Sprintf(":%v", port))
	if err != nil {
		log.Fatal(err)
	}

	if err := s.Serve(l); err != nil {
		log.Fatal(err)
	}
}
