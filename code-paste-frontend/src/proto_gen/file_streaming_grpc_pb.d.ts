// package: 
// file: file_streaming.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as file_streaming_pb from "./file_streaming_pb";

interface IFileStreamingService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    streamFile: IFileStreamingService_IStreamFile;
}

interface IFileStreamingService_IStreamFile extends grpc.MethodDefinition<file_streaming_pb.FileStreamingRequest, file_streaming_pb.FileStreamingResponse> {
    path: "/FileStreaming/StreamFile";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<file_streaming_pb.FileStreamingRequest>;
    requestDeserialize: grpc.deserialize<file_streaming_pb.FileStreamingRequest>;
    responseSerialize: grpc.serialize<file_streaming_pb.FileStreamingResponse>;
    responseDeserialize: grpc.deserialize<file_streaming_pb.FileStreamingResponse>;
}

export const FileStreamingService: IFileStreamingService;

export interface IFileStreamingServer extends grpc.UntypedServiceImplementation {
    streamFile: grpc.handleServerStreamingCall<file_streaming_pb.FileStreamingRequest, file_streaming_pb.FileStreamingResponse>;
}

export interface IFileStreamingClient {
    streamFile(request: file_streaming_pb.FileStreamingRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<file_streaming_pb.FileStreamingResponse>;
    streamFile(request: file_streaming_pb.FileStreamingRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<file_streaming_pb.FileStreamingResponse>;
}

export class FileStreamingClient extends grpc.Client implements IFileStreamingClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public streamFile(request: file_streaming_pb.FileStreamingRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<file_streaming_pb.FileStreamingResponse>;
    public streamFile(request: file_streaming_pb.FileStreamingRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<file_streaming_pb.FileStreamingResponse>;
}
