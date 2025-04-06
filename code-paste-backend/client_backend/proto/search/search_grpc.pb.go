// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v3.21.12
// source: search.proto

package search

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
	Search_UploadInIndex_FullMethodName   = "/notifications.Search/UploadInIndex"
	Search_SearchResources_FullMethodName = "/notifications.Search/SearchResources"
)

// SearchClient is the client API for Search service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type SearchClient interface {
	UploadInIndex(ctx context.Context, in *UploadInIndexRequest, opts ...grpc.CallOption) (*UploadInIndexResponse, error)
	SearchResources(ctx context.Context, in *SearchResourcesRequest, opts ...grpc.CallOption) (*SearchResourcesResponse, error)
}

type searchClient struct {
	cc grpc.ClientConnInterface
}

func NewSearchClient(cc grpc.ClientConnInterface) SearchClient {
	return &searchClient{cc}
}

func (c *searchClient) UploadInIndex(ctx context.Context, in *UploadInIndexRequest, opts ...grpc.CallOption) (*UploadInIndexResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(UploadInIndexResponse)
	err := c.cc.Invoke(ctx, Search_UploadInIndex_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *searchClient) SearchResources(ctx context.Context, in *SearchResourcesRequest, opts ...grpc.CallOption) (*SearchResourcesResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(SearchResourcesResponse)
	err := c.cc.Invoke(ctx, Search_SearchResources_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// SearchServer is the server API for Search service.
// All implementations must embed UnimplementedSearchServer
// for forward compatibility
type SearchServer interface {
	UploadInIndex(context.Context, *UploadInIndexRequest) (*UploadInIndexResponse, error)
	SearchResources(context.Context, *SearchResourcesRequest) (*SearchResourcesResponse, error)
	mustEmbedUnimplementedSearchServer()
}

// UnimplementedSearchServer must be embedded to have forward compatible implementations.
type UnimplementedSearchServer struct {
}

func (UnimplementedSearchServer) UploadInIndex(context.Context, *UploadInIndexRequest) (*UploadInIndexResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UploadInIndex not implemented")
}
func (UnimplementedSearchServer) SearchResources(context.Context, *SearchResourcesRequest) (*SearchResourcesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SearchResources not implemented")
}
func (UnimplementedSearchServer) mustEmbedUnimplementedSearchServer() {}

// UnsafeSearchServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to SearchServer will
// result in compilation errors.
type UnsafeSearchServer interface {
	mustEmbedUnimplementedSearchServer()
}

func RegisterSearchServer(s grpc.ServiceRegistrar, srv SearchServer) {
	s.RegisterService(&Search_ServiceDesc, srv)
}

func _Search_UploadInIndex_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UploadInIndexRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(SearchServer).UploadInIndex(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Search_UploadInIndex_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(SearchServer).UploadInIndex(ctx, req.(*UploadInIndexRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Search_SearchResources_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SearchResourcesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(SearchServer).SearchResources(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Search_SearchResources_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(SearchServer).SearchResources(ctx, req.(*SearchResourcesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Search_ServiceDesc is the grpc.ServiceDesc for Search service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Search_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "notifications.Search",
	HandlerType: (*SearchServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "UploadInIndex",
			Handler:    _Search_UploadInIndex_Handler,
		},
		{
			MethodName: "SearchResources",
			Handler:    _Search_SearchResources_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "search.proto",
}
