all:
	# protoc \
	# 	--plugin=protoc-gen-ts=../code-paste-frontend/node_modules/.bin/protoc-gen-ts \
	# 	--ts_out=grpc_js:../code-paste-frontend/proto_gen \
	# 	--proto_path ./ \
	# 	file_streaming.proto

	npx grpc_tools_node_protoc \
		--js_out=import_style=commonjs,binary:../code-paste-frontend/proto_gen \
		--grpc_out=grpc_js:../code-paste-frontend/proto_gen \
		--plugin=protoc-gen-grpc=../code-paste-frontend/node_modules/.bin/protoc-gen-ts \
		-I ./ \
		file_streaming.proto