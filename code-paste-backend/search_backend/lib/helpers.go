package lib

import (
	"bytes"
	"compress/gzip"
	"io"
	"log"
)

func DecompressText(text []byte) ([]byte, error) {
	decompressed, err := gzip.NewReader(bytes.NewReader(text))
	if err != nil {
		log.Fatalln("Encoding gzip error: ", err)
	}
	defer decompressed.Close()

	return io.ReadAll(decompressed)
}
