package server

import (
	. "client_backend/responses"
	. "client_backend/server/handlers"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"
)

type ServerImpl struct {
	Context *HandleContext
}

func SetDefaultHeaders(w http.ResponseWriter) http.ResponseWriter {
	w.Header().Set("Content-Type", "*")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Max-Age", "15")
	w.Header().Set("Access-Control-Allow-Headers", "content-type, userId, offset, username, email, password, foldername, user, filename, cookie")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	return w
}

func (serverImpl *ServerImpl) CheckResourcePassword(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w)

	if r.Method == "GET" {
		resourceUuid := r.PathValue("resourceUuid")
		passwordToCheck := r.Header.Get("Password")
		result := ResourcePasswordCheck(resourceUuid, passwordToCheck, serverImpl.Context)
		resultJson, _ := json.Marshal(result)
		w.WriteHeader(http.StatusOK)
		w.Write(resultJson)
	} else {
		w.WriteHeader(http.StatusOK)
	}
}

func (serverImpl *ServerImpl) GetResourceMetaData(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w)

	if r.Method == "GET" {
		resourceUuid := r.PathValue("resourceUuid")
		session, _ := serverImpl.Context.SessionStore.GetSession(r)
		resourceMetaData := GetResourceMetaData(resourceUuid, strings.ToLower(session.GetUserName()), serverImpl.Context)
		response, err := json.Marshal(resourceMetaData)

		if err != nil {
			log.Println("Error getting resource metadata: ", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write(response)
	} else {
		w.WriteHeader(http.StatusOK)
	}
}

func (serverImpl *ServerImpl) GetResourceData(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w)

	resourceUuid := r.PathValue("resourceUuid")
	textData, err := GetResourceData(resourceUuid, serverImpl.Context)

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/text")
	w.Write(textData)
}

func (serverImpl *ServerImpl) UploadDocument(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w)

	if r.Method == "POST" {
		len := r.ContentLength
		body := make([]byte, len)
		r.Body.Read(body)

		userName := r.Header.Get("UserName")
		userId := r.Header.Get("UserId")
		filePassword := r.Header.Get("Password")
		fileName := r.Header.Get("FileName")
		folderName := r.Header.Get("FolderName")

		resourceUuid := CreateResource(body, userId, userName, filePassword, fileName, folderName, serverImpl.Context)
		w.Write([]byte(resourceUuid))
	} else {
		w.WriteHeader(http.StatusOK)
	}
}

func (serverImpl *ServerImpl) CreateUser(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w)

	if r.Method == "POST" {
		session, _ := serverImpl.Context.SessionStore.GetSession(r)
		userName := r.Header.Get("UserName")
		email := r.Header.Get("Email")
		password := r.Header.Get("Password")

		userId, err := CreateUser(userName, email, password, serverImpl.Context)

		if err != nil {
			log.Println("Error creating user: ", err)
			w.WriteHeader(http.StatusNotFound)
			return
		}

		session.SetAuthenticated(true)
		session.SetUserName(userName)
		session.Save(r, w)
		w.Write([]byte(userId))
	} else {
		w.WriteHeader(http.StatusOK)
	}
}

func (serverImpl *ServerImpl) CheckAccountPassword(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w)

	if r.Method == "GET" {

		session, err := serverImpl.Context.SessionStore.GetSession(r)

		userName := r.Header.Get("UserName")
		password := r.Header.Get("Password")

		result, err := CheckAccountPassword(userName, password, serverImpl.Context)

		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		session.SetAuthenticated(true)
		session.SetUserName(userName)
		session.Save(r, w)
		resultJson, _ := json.Marshal(result)
		w.WriteHeader(http.StatusOK)
		w.Write(resultJson)
	} else {
		w.WriteHeader(http.StatusOK)
	}
}

func (serverImpl *ServerImpl) GetUserResources(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w)

	if r.Method == "GET" {
		userId := r.Header.Get("UserId")
		offset, _ := strconv.Atoi(r.Header.Get("Offset"))

		resourcesPreview, err := GetUserResources(userId, offset, serverImpl.Context)
		if err != nil {
			log.Println("Can not get user resources: ", err)
			w.WriteHeader(http.StatusNotFound)
			return
		}

		resultJson, _ := json.Marshal(&UserResources{
			Resources: resourcesPreview,
		})
		w.WriteHeader(http.StatusOK)
		w.Write(resultJson)
	}
}

func (serverImpl *ServerImpl) Logout(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w)

	if r.Method == "GET" {
		session, _ := serverImpl.Context.SessionStore.GetSession(r)
		session.SetAuthenticated(false)
		session.SetUserName("")
		w.WriteHeader(http.StatusOK)
	}
}
