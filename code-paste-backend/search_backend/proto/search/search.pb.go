// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.33.0
// 	protoc        v3.21.12
// source: search.proto

package search

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type UploadInIndexRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Language     string `protobuf:"bytes,1,opt,name=language,proto3" json:"language,omitempty"`
	ResourceUuid string `protobuf:"bytes,2,opt,name=resourceUuid,proto3" json:"resourceUuid,omitempty"`
	Data         []byte `protobuf:"bytes,3,opt,name=data,proto3" json:"data,omitempty"`
}

func (x *UploadInIndexRequest) Reset() {
	*x = UploadInIndexRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_search_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UploadInIndexRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UploadInIndexRequest) ProtoMessage() {}

func (x *UploadInIndexRequest) ProtoReflect() protoreflect.Message {
	mi := &file_search_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UploadInIndexRequest.ProtoReflect.Descriptor instead.
func (*UploadInIndexRequest) Descriptor() ([]byte, []int) {
	return file_search_proto_rawDescGZIP(), []int{0}
}

func (x *UploadInIndexRequest) GetLanguage() string {
	if x != nil {
		return x.Language
	}
	return ""
}

func (x *UploadInIndexRequest) GetResourceUuid() string {
	if x != nil {
		return x.ResourceUuid
	}
	return ""
}

func (x *UploadInIndexRequest) GetData() []byte {
	if x != nil {
		return x.Data
	}
	return nil
}

type UploadInIndexResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *UploadInIndexResponse) Reset() {
	*x = UploadInIndexResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_search_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UploadInIndexResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UploadInIndexResponse) ProtoMessage() {}

func (x *UploadInIndexResponse) ProtoReflect() protoreflect.Message {
	mi := &file_search_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UploadInIndexResponse.ProtoReflect.Descriptor instead.
func (*UploadInIndexResponse) Descriptor() ([]byte, []int) {
	return file_search_proto_rawDescGZIP(), []int{1}
}

type SearchResourcesRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	SearchText string `protobuf:"bytes,1,opt,name=search_text,json=searchText,proto3" json:"search_text,omitempty"`
}

func (x *SearchResourcesRequest) Reset() {
	*x = SearchResourcesRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_search_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SearchResourcesRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SearchResourcesRequest) ProtoMessage() {}

func (x *SearchResourcesRequest) ProtoReflect() protoreflect.Message {
	mi := &file_search_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SearchResourcesRequest.ProtoReflect.Descriptor instead.
func (*SearchResourcesRequest) Descriptor() ([]byte, []int) {
	return file_search_proto_rawDescGZIP(), []int{2}
}

func (x *SearchResourcesRequest) GetSearchText() string {
	if x != nil {
		return x.SearchText
	}
	return ""
}

type SearchResourcesResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ResourceIds []string `protobuf:"bytes,1,rep,name=resource_ids,json=resourceIds,proto3" json:"resource_ids,omitempty"`
}

func (x *SearchResourcesResponse) Reset() {
	*x = SearchResourcesResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_search_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SearchResourcesResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SearchResourcesResponse) ProtoMessage() {}

func (x *SearchResourcesResponse) ProtoReflect() protoreflect.Message {
	mi := &file_search_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SearchResourcesResponse.ProtoReflect.Descriptor instead.
func (*SearchResourcesResponse) Descriptor() ([]byte, []int) {
	return file_search_proto_rawDescGZIP(), []int{3}
}

func (x *SearchResourcesResponse) GetResourceIds() []string {
	if x != nil {
		return x.ResourceIds
	}
	return nil
}

var File_search_proto protoreflect.FileDescriptor

var file_search_proto_rawDesc = []byte{
	0x0a, 0x0c, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x0d,
	0x6e, 0x6f, 0x74, 0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x22, 0x6a, 0x0a,
	0x14, 0x55, 0x70, 0x6c, 0x6f, 0x61, 0x64, 0x49, 0x6e, 0x49, 0x6e, 0x64, 0x65, 0x78, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1a, 0x0a, 0x08, 0x6c, 0x61, 0x6e, 0x67, 0x75, 0x61, 0x67,
	0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x6c, 0x61, 0x6e, 0x67, 0x75, 0x61, 0x67,
	0x65, 0x12, 0x22, 0x0a, 0x0c, 0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x55, 0x75, 0x69,
	0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0c, 0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63,
	0x65, 0x55, 0x75, 0x69, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x64, 0x61, 0x74, 0x61, 0x18, 0x03, 0x20,
	0x01, 0x28, 0x0c, 0x52, 0x04, 0x64, 0x61, 0x74, 0x61, 0x22, 0x17, 0x0a, 0x15, 0x55, 0x70, 0x6c,
	0x6f, 0x61, 0x64, 0x49, 0x6e, 0x49, 0x6e, 0x64, 0x65, 0x78, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x22, 0x39, 0x0a, 0x16, 0x53, 0x65, 0x61, 0x72, 0x63, 0x68, 0x52, 0x65, 0x73, 0x6f,
	0x75, 0x72, 0x63, 0x65, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1f, 0x0a, 0x0b,
	0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x5f, 0x74, 0x65, 0x78, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x0a, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x54, 0x65, 0x78, 0x74, 0x22, 0x3c, 0x0a,
	0x17, 0x53, 0x65, 0x61, 0x72, 0x63, 0x68, 0x52, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x21, 0x0a, 0x0c, 0x72, 0x65, 0x73, 0x6f,
	0x75, 0x72, 0x63, 0x65, 0x5f, 0x69, 0x64, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x09, 0x52, 0x0b,
	0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x49, 0x64, 0x73, 0x32, 0xca, 0x01, 0x0a, 0x06,
	0x53, 0x65, 0x61, 0x72, 0x63, 0x68, 0x12, 0x5c, 0x0a, 0x0d, 0x55, 0x70, 0x6c, 0x6f, 0x61, 0x64,
	0x49, 0x6e, 0x49, 0x6e, 0x64, 0x65, 0x78, 0x12, 0x23, 0x2e, 0x6e, 0x6f, 0x74, 0x69, 0x66, 0x69,
	0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x55, 0x70, 0x6c, 0x6f, 0x61, 0x64, 0x49, 0x6e,
	0x49, 0x6e, 0x64, 0x65, 0x78, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x24, 0x2e, 0x6e,
	0x6f, 0x74, 0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x55, 0x70, 0x6c,
	0x6f, 0x61, 0x64, 0x49, 0x6e, 0x49, 0x6e, 0x64, 0x65, 0x78, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x22, 0x00, 0x12, 0x62, 0x0a, 0x0f, 0x53, 0x65, 0x61, 0x72, 0x63, 0x68, 0x52, 0x65,
	0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x12, 0x25, 0x2e, 0x6e, 0x6f, 0x74, 0x69, 0x66, 0x69,
	0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x53, 0x65, 0x61, 0x72, 0x63, 0x68, 0x52, 0x65,
	0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x26,
	0x2e, 0x6e, 0x6f, 0x74, 0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x53,
	0x65, 0x61, 0x72, 0x63, 0x68, 0x52, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x42, 0x0a, 0x5a, 0x08, 0x2e, 0x2f, 0x73, 0x65,
	0x61, 0x72, 0x63, 0x68, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_search_proto_rawDescOnce sync.Once
	file_search_proto_rawDescData = file_search_proto_rawDesc
)

func file_search_proto_rawDescGZIP() []byte {
	file_search_proto_rawDescOnce.Do(func() {
		file_search_proto_rawDescData = protoimpl.X.CompressGZIP(file_search_proto_rawDescData)
	})
	return file_search_proto_rawDescData
}

var file_search_proto_msgTypes = make([]protoimpl.MessageInfo, 4)
var file_search_proto_goTypes = []interface{}{
	(*UploadInIndexRequest)(nil),    // 0: notifications.UploadInIndexRequest
	(*UploadInIndexResponse)(nil),   // 1: notifications.UploadInIndexResponse
	(*SearchResourcesRequest)(nil),  // 2: notifications.SearchResourcesRequest
	(*SearchResourcesResponse)(nil), // 3: notifications.SearchResourcesResponse
}
var file_search_proto_depIdxs = []int32{
	0, // 0: notifications.Search.UploadInIndex:input_type -> notifications.UploadInIndexRequest
	2, // 1: notifications.Search.SearchResources:input_type -> notifications.SearchResourcesRequest
	1, // 2: notifications.Search.UploadInIndex:output_type -> notifications.UploadInIndexResponse
	3, // 3: notifications.Search.SearchResources:output_type -> notifications.SearchResourcesResponse
	2, // [2:4] is the sub-list for method output_type
	0, // [0:2] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_search_proto_init() }
func file_search_proto_init() {
	if File_search_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_search_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UploadInIndexRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_search_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UploadInIndexResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_search_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SearchResourcesRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_search_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SearchResourcesResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_search_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   4,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_search_proto_goTypes,
		DependencyIndexes: file_search_proto_depIdxs,
		MessageInfos:      file_search_proto_msgTypes,
	}.Build()
	File_search_proto = out.File
	file_search_proto_rawDesc = nil
	file_search_proto_goTypes = nil
	file_search_proto_depIdxs = nil
}
