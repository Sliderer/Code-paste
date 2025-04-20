package models_for_server

import (
	"log"
	"net/http"

	. "github.com/gorilla/sessions"
)

type ClientSession struct {
	Session *Session
}

func ClearSession(session *ClientSession) {
	session.SetAuthenticated(false)
	session.SetUserName("")
	session.SetUserId("")
}

func SetDataInCookie(userName string, userId string, session *ClientSession) {
	session.SetAuthenticated(true)
	session.SetUserName(userName)
	session.SetUserId(userId)
}

func getSessionValue[T any](session *Session, key string) T {
	isAuthenticatedValue, exists := session.Values["IsAuthenticated"]
	var emptyResult T

	isAuthenticated, ok := isAuthenticatedValue.(bool)
	if !ok || !exists || !isAuthenticated {
		return emptyResult
	}
	result, ok := session.Values[key].(T)

	if !ok {
		return emptyResult
	}

	return result
}

func (session *ClientSession) Save(r *http.Request, w http.ResponseWriter) {
	session.Session.Save(r, w)
}

func (session *ClientSession) IsAuthenticated() bool {
	isAuthenticated, ok := session.Session.Values["IsAuthenticated"].(bool)
	log.Println(isAuthenticated, ok)
	return ok && isAuthenticated
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

func (session *ClientSession) GetUserId() string {
	return getSessionValue[string](session.Session, "UserId")
}

func (session *ClientSession) SetUserId(value string) {
	session.Session.Values["UserId"] = value
}
