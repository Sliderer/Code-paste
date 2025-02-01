package lib

import (
	"net/http"

	. "github.com/gorilla/sessions"
)

type ClientSession struct {
	Session *Session
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
	return session.Session.Values["UserName"].(string)
}

func (session *ClientSession) SetUserName(value string) {
	session.Session.Values["UserName"] = value
}
