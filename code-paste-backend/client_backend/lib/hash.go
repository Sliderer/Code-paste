package lib

import (
	"crypto/md5"
	"encoding/base64"
)

func GetHash(str string) string {
	hasher := md5.New()
	hasher.Write([]byte(str))
	return base64.URLEncoding.EncodeToString(hasher.Sum(nil))
}
