// package: 
// file: file_streaming.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class FileStreamingRequest extends jspb.Message { 
    clearFilelinesList(): void;
    getFilelinesList(): Array<string>;
    setFilelinesList(value: Array<string>): FileStreamingRequest;
    addFilelines(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileStreamingRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FileStreamingRequest): FileStreamingRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileStreamingRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileStreamingRequest;
    static deserializeBinaryFromReader(message: FileStreamingRequest, reader: jspb.BinaryReader): FileStreamingRequest;
}

export namespace FileStreamingRequest {
    export type AsObject = {
        filelinesList: Array<string>,
    }
}

export class FileStreamingResponse extends jspb.Message { 
    getResult(): number;
    setResult(value: number): FileStreamingResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileStreamingResponse.AsObject;
    static toObject(includeInstance: boolean, msg: FileStreamingResponse): FileStreamingResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileStreamingResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileStreamingResponse;
    static deserializeBinaryFromReader(message: FileStreamingResponse, reader: jspb.BinaryReader): FileStreamingResponse;
}

export namespace FileStreamingResponse {
    export type AsObject = {
        result: number,
    }
}
