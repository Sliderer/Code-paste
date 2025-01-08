all:
	protoc \
		--plugin=protoc-gen-ts=../code-paste-frontend/node_modules/.bin/protoc-gen-ts \
		--ts_out=grpc_js:../code-paste-frontend/proto_gen \
		--proto_path ./ \
		file_streaming.proto