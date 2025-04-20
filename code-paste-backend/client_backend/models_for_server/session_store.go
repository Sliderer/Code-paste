package models_for_server

import (
	"log"
	"net/http"

	. "github.com/gorilla/sessions"
)

type SessionStore struct {
	Key   []byte
	store *CookieStore
}

func (sessionStore *SessionStore) CreateCookieStore() {
	sessionStore.store = NewCookieStore(sessionStore.Key)
}

func (sessionStore *SessionStore) GetSession(request *http.Request) (*ClientSession, error) {
	session, err := sessionStore.store.Get(request, "session_id")
	if err != nil {
		log.Println("Error extracting session: ", err.Error())
	}
	return &ClientSession{Session: session}, err
}
