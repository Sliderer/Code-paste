FROM golang:alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o client_backend

CMD ["./client_backend"]