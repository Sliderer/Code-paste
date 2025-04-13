package lib

import "strings"

func GetUserBucketName(userName string) string {
	userName = strings.ToLower(userName)
	userName = strings.Replace(userName, "_", "-", -1)
	userName = strings.Replace(userName, " ", "-", -1)
	return userName
}
