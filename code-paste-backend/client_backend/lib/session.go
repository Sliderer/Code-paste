package lib

import (
	"net/http"

	. "github.com/gorilla/sessions"
)

type ClientSession struct {
	Session *Session
}

func getSessionValue[T any](session *Session, key string) T {
	isAuthenticated, exists := session.Values["IsAuthenticated"]
	if !exists || !isAuthenticated.(bool) {
		var emptyResult T
		return emptyResult
	}
	return session.Values[key].(T)
}

func (session *ClientSession) Save(r *http.Request, w http.ResponseWriter) {
	session.Session.Save(r, w)
}

func (session *ClientSession) IsAuthenticated() bool {
	return session.Session.Values["IsAuthenticated"].(bool)
}

func (session *ClientSession) SetAuthenticated(value bool) {
	session.Session.Values["IsAuthenticated"] = value
}

func (session *ClientSession) GetUserName() string {
	return getSessionValue[string](session.Session, "UserName")
}

func (session *ClientSession) SetUserName(value string) {
	session.Session.Values["UserName"] = value
}
