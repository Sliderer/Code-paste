package server

import (
	"bytes"
	"compress/gzip"
	"fmt"
	"io/ioutil"
	"net/http"
)

type ServerImpl struct {
}

func (serverImpl *ServerImpl) SendDocumentToIndex() {

}

func (serverImpl *ServerImpl) GetDocument() {

}

func (serverImpl *ServerImpl) UploadDocument(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Max-Age", "15")

	len := r.ContentLength
	body := make([]byte, len)
	r.Body.Read(body)

	decompressed, err := gzip.NewReader(bytes.NewReader(body))
	if err != nil {
		panic(err)
	}
	defer decompressed.Close()

	decompressedData, err := ioutil.ReadAll(decompressed)
	if err != nil {
		panic(err)
	}

	fmt.Print(string(decompressedData))
}
