// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v3.21.12
// source: notivications.proto

package notifications

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.62.0 or later.
const _ = grpc.SupportPackageIsVersion8

const (
	Notifications_SendNotification_FullMethodName = "/notifications.Notifications/SendNotification"
)

// NotificationsClient is the client API for Notifications service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type NotificationsClient interface {
	SendNotification(ctx context.Context, in *SendNotificationRequest, opts ...grpc.CallOption) (*SendNotificationResponse, error)
}

type notificationsClient struct {
	cc grpc.ClientConnInterface
}

func NewNotificationsClient(cc grpc.ClientConnInterface) NotificationsClient {
	return &notificationsClient{cc}
}

func (c *notificationsClient) SendNotification(ctx context.Context, in *SendNotificationRequest, opts ...grpc.CallOption) (*SendNotificationResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(SendNotificationResponse)
	err := c.cc.Invoke(ctx, Notifications_SendNotification_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// NotificationsServer is the server API for Notifications service.
// All implementations must embed UnimplementedNotificationsServer
// for forward compatibility
type NotificationsServer interface {
	SendNotification(context.Context, *SendNotificationRequest) (*SendNotificationResponse, error)
	mustEmbedUnimplementedNotificationsServer()
}

// UnimplementedNotificationsServer must be embedded to have forward compatible implementations.
type UnimplementedNotificationsServer struct {
}

func (UnimplementedNotificationsServer) SendNotification(context.Context, *SendNotificationRequest) (*SendNotificationResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SendNotification not implemented")
}
func (UnimplementedNotificationsServer) mustEmbedUnimplementedNotificationsServer() {}

// UnsafeNotificationsServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to NotificationsServer will
// result in compilation errors.
type UnsafeNotificationsServer interface {
	mustEmbedUnimplementedNotificationsServer()
}

func RegisterNotificationsServer(s grpc.ServiceRegistrar, srv NotificationsServer) {
	s.RegisterService(&Notifications_ServiceDesc, srv)
}

func _Notifications_SendNotification_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SendNotificationRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(NotificationsServer).SendNotification(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Notifications_SendNotification_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(NotificationsServer).SendNotification(ctx, req.(*SendNotificationRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Notifications_ServiceDesc is the grpc.ServiceDesc for Notifications service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Notifications_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "notifications.Notifications",
	HandlerType: (*NotificationsServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "SendNotification",
			Handler:    _Notifications_SendNotification_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "notivications.proto",
}
