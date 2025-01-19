all:
  npx grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:../code-paste-frontend/src/proto_gen \
    --grpc_out=grpc_js:../code-paste-frontend/src/proto_gen \
    --plugin=protoc-gen-grpc=../code-paste-frontend/node_modules/.bin/protoc-gen-ts \
    -I ../proto \
    file_streaming.proto