package server

import (
	. "client_backend/models_for_server"
	. "client_backend/requests"
	. "client_backend/responses"
	. "client_backend/server/handlers"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

type ServerImpl struct {
	Context *HandleContext
}

func SetDefaultHeaders(w http.ResponseWriter, allowedHeaders string) http.ResponseWriter {
	w.Header().Set("Content-Type", "*")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Max-Age", "15")
	w.Header().Set("Access-Control-Allow-Headers", allowedHeaders)
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Methods", "*")

	return w
}

func (serverImpl *ServerImpl) CheckResourcePassword(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, password")

	if r.Method == "GET" {
		resourceUuid := r.PathValue("resourceUuid")
		passwordToCheck := r.Header.Get("Password")
		result, err := ResourcePasswordCheck(resourceUuid, passwordToCheck, serverImpl.Context)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		resultJson, _ := json.Marshal(result)
		w.WriteHeader(http.StatusOK)
		w.Write(resultJson)
	} else {
		w.WriteHeader(http.StatusOK)
	}
}

func (serverImpl *ServerImpl) GetResourceMetaData(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, user-id")

	if r.Method == "GET" {
		userId := r.Header.Get("User-Id")
		resourceUuid := r.PathValue("resourceUuid")

		session, _ := serverImpl.Context.SessionStore.GetSession(r)

		resourceMetaData, err := GetResourceMetaData(userId, resourceUuid, session.GetUserName(), serverImpl.Context)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		response, err := json.Marshal(resourceMetaData)

		if err != nil {

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
	w = SetDefaultHeaders(w, "content-type, password")

	if r.Method == "GET" {
		resourceUuid := r.PathValue("resourceUuid")
		textData, err := GetResourceData(resourceUuid, serverImpl.Context)

		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusNotFound)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/text")
		w.Write(textData)
	} else {
		w.WriteHeader(http.StatusOK)
	}
}

func (serverImpl *ServerImpl) UploadResource(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, user-name, user-id, password, file-name, folder-name, language, ttl, highlight-setting")

	if r.Method == "POST" {
		len := r.ContentLength
		body := make([]byte, len)
		r.Body.Read(body)

		userName := r.Header.Get("User-Name")
		userId := r.Header.Get("User-Id")
		filePassword := r.Header.Get("Password")
		fileName := r.Header.Get("File-Name")
		folderName := r.Header.Get("Folder-Name")
		language := r.Header.Get("Language")
		highlightSetting := r.Header.Get("Highlight-Setting")
		ttl, _ := strconv.Atoi(r.Header.Get("ttl"))

		resourceUuid := CreateResource(body, userId, userName, language, highlightSetting, filePassword, fileName, folderName, ttl, serverImpl.Context)
		w.Write([]byte(resourceUuid))
	} else {
		w.WriteHeader(http.StatusOK)
	}
}

func (serverImpl *ServerImpl) CreateUser(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, user-name, email, password")

	if r.Method == "POST" {
		session, _ := serverImpl.Context.SessionStore.GetSession(r)
		userName := r.Header.Get("User-Name")
		email := r.Header.Get("Email")
		password := r.Header.Get("Password")

		userId, err := CreateUser(userName, email, password, serverImpl.Context)

		if err != nil {
			log.Println(err)
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
	w = SetDefaultHeaders(w, "content-type, user-name, password")

	if r.Method == "GET" {

		session, err := serverImpl.Context.SessionStore.GetSession(r)

		userName := r.Header.Get("User-Name")
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
	w = SetDefaultHeaders(w, "content-type, user-id, offset, need-only-liked, path")

	if r.Method == "GET" {
		userId := r.Header.Get("User-Id")
		path := r.Header.Get("Path")
		var needOnlyLiked bool

		if r.Header.Get("Need-Only-Liked") == "true" {
			needOnlyLiked = true
		} else {
			needOnlyLiked = false
		}
		offset, _ := strconv.Atoi(r.Header.Get("Offset"))

		resourcesPreview, err := GetUserResources(userId, path, offset, needOnlyLiked, serverImpl.Context)
		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		resultJson, _ := json.Marshal(&UserResources{
			Resources: resourcesPreview,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(resultJson)
	} else {
		w.WriteHeader(http.StatusOK)
	}
}

func (serverImpl *ServerImpl) Logout(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type")

	if r.Method == "GET" {
		session, _ := serverImpl.Context.SessionStore.GetSession(r)
		session.SetAuthenticated(false)
		session.SetUserName("")
		session.Save(r, w)
		w.WriteHeader(http.StatusOK)
	}
}

func (serverImpl *ServerImpl) GetUserMetadata(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, user-name")

	if r.Method == "GET" {
		userName := r.Header.Get("User-Name")
		userMetaData, err := GetUserMetaData(userName, serverImpl.Context)
		if err != nil {
			log.Println("Can not get user metadata: ", err)
			w.WriteHeader(http.StatusNotFound)
			return
		}

		resultJson, _ := json.Marshal(userMetaData)

		w.WriteHeader(http.StatusOK)
		w.Write(resultJson)
	}
}

func (serverImpl *ServerImpl) UpdateUserContacts(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type")

	if r.Method == "POST" {
		len := r.ContentLength
		body := make([]byte, len)
		r.Body.Read(body)

		var requestBody UpdateUserContactsRequest
		json.Unmarshal(body, &requestBody)

		err := UpdateUserContacts(requestBody, serverImpl.Context)

		if err != nil {
			log.Println("Error updating user contacts: ", err)
			w.WriteHeader(http.StatusNotFound)
		} else {
			w.WriteHeader(http.StatusOK)
		}
	}
}

func (serverImpl *ServerImpl) LikeResource(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type")

	if r.Method == "POST" {
		len := r.ContentLength
		body := make([]byte, len)
		r.Body.Read(body)

		var requestBody LikeResourceRequest
		json.Unmarshal(body, &requestBody)

		err := LikeResource(requestBody, serverImpl.Context)

		if err != nil {
			log.Println("Error updating user contacts: ", err)
			w.WriteHeader(http.StatusNotFound)
		} else {
			w.WriteHeader(http.StatusOK)
		}
	}
}

func (serverImpl *ServerImpl) CreateFolder(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, user-name, user-id, folder-name, folder-path")

	if r.Method == "POST" {
		userName := r.Header.Get("User-Name")
		userId := r.Header.Get("User-Id")
		folderName := r.Header.Get("Folder-Name")
		folderPath := r.Header.Get("Folder-Path")

		err := CreateFolder(userName, userId, folderName, folderPath, serverImpl.Context)

		if err != nil {
			log.Println("Error deleting resource: ", err)
			w.WriteHeader(http.StatusNotFound)
		} else {
			w.WriteHeader(http.StatusOK)
		}
	} else {
		w.WriteHeader(http.StatusOK)
	}
}

func (serverImpl *ServerImpl) DeleteFolder(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, user-id")

	if r.Method == "DELETE" {
		userId := r.Header.Get("User-Id")
		resourceUuid := r.PathValue("resourceUuid")

		err := DeleteFolder(userId, resourceUuid, serverImpl.Context)

		if err != nil {
			log.Println("Error deleting resource: ", err)
			w.WriteHeader(http.StatusNotFound)
		} else {
			w.WriteHeader(http.StatusOK)
		}
	} else {
		w.WriteHeader(http.StatusOK)
	}
}

func (serverImpl *ServerImpl) GetFolderUuid(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, path")

	if r.Method == "GET" {
		path := r.Header.Get("Path")

		resourceUuid, err := GetFolderUuid(path, serverImpl.Context)

		if err != nil {
			log.Println("Error getting folder uuid: ", err)
			w.WriteHeader(http.StatusNotFound)
		} else {
			w.WriteHeader(http.StatusOK)
			log.Println("Folder Uuid", resourceUuid)
			w.Write([]byte(resourceUuid))
		}
	} else {
		w.WriteHeader(http.StatusOK)
	}
}

func (serverImpl *ServerImpl) DeleteResource(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, user-name, user-id")

	if r.Method == "DELETE" {
		userName := r.Header.Get("User-Name")
		userId := r.Header.Get("User-Id")
		resourceUuid := r.PathValue("resourceUuid")
		err := DeleteResource(userId, userName, resourceUuid, serverImpl.Context)

		if err != nil {
			log.Println("Error deleting resource: ", err)
			w.WriteHeader(http.StatusNotFound)
		} else {
			w.WriteHeader(http.StatusOK)
		}
	} else {
		w.WriteHeader(http.StatusOK)
	}
}
