package lib

import "strings"

func GetUserBucketName(userName string) string {
	return strings.ToLower(userName)
}
