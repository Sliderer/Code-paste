package lib

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func ParseBody(r *http.Request) []byte {
	len := r.ContentLength
	body := make([]byte, len)
	r.Body.Read(body)
	return body
}

func GetRequest[T interface{}](r *http.Request) (T, error) {
	body := ParseBody(r)
	log.Println(string(body))
	var request T
	err := json.Unmarshal(body, &request)
	return request, err
}

func SetError(w http.ResponseWriter, error_code int, error_text string) {
	log.Println(error_text)
	w.WriteHeader(error_code)
	fmt.Fprint(w, error_text)
}
