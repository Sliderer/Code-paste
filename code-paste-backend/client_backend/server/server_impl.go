package server

import (
	"client_backend/lib"
	. "client_backend/models_for_server"
	"client_backend/requests"
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

func DefaultHandler(method string, w http.ResponseWriter, r *http.Request, handleFunc func()) {
	switch r.Method {
	case method:
		handleFunc()
	case "OPTIONS":
		w.WriteHeader(http.StatusOK)
	default:
		lib.SetError(w, http.StatusNotFound, "Path not found")
	}
}

func (serverImpl *ServerImpl) CheckResourcePassword(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, password")

	DefaultHandler("GET", w, r, func() {
		resourceUuid := r.PathValue("resourceUuid")
		passwordToCheck := r.Header.Get("Password")
		result, err := ResourcePasswordCheck(resourceUuid, passwordToCheck, serverImpl.Context)
		if err != nil {
			lib.SetError(w, http.StatusInternalServerError, "Can not check resource password: "+err.Error())
			return
		}
		resultJson, _ := json.Marshal(result)
		w.WriteHeader(http.StatusOK)
		w.Write(resultJson)
	})
}

func (serverImpl *ServerImpl) GetResourceMetaData(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, user-id")

	DefaultHandler("GET", w, r, func() {
		userId := r.Header.Get("User-Id")
		resourceUuid := r.PathValue("resourceUuid")

		session, _ := serverImpl.Context.SessionStore.GetSession(r)

		resourceMetaData, err := GetResourceMetaData(userId, resourceUuid, session.GetUserName(), serverImpl.Context)
		if err != nil {
			lib.SetError(w, http.StatusInternalServerError, "Can not get metadata: "+err.Error())
			return
		}
		response, err := json.Marshal(resourceMetaData)

		if err != nil {
			lib.SetError(w, http.StatusInternalServerError, "Can not parse metadata: "+err.Error())
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write(response)
	})
}

func (serverImpl *ServerImpl) GetResourcePreview(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, user-id")

	DefaultHandler("GET", w, r, func() {
		resourceUuid := r.PathValue("resourceUuid")

		resourcePreview, err := GetResourcePreview(resourceUuid, serverImpl.Context)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		response, err := json.Marshal(resourcePreview)

		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write(response)
	})
}

func (serverImpl *ServerImpl) GetResourceData(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, password")

	DefaultHandler("GET", w, r, func() {
		resourceUuid := r.PathValue("resourceUuid")
		textData, err := GetResourceData(resourceUuid, serverImpl.Context)

		if err != nil {
			lib.SetError(w, http.StatusNotFound, "Can not get resource data: "+err.Error())
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/text")
		w.Write(textData)
	})
}

func (serverImpl *ServerImpl) UploadResource(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type")

	DefaultHandler("POST", w, r, func() {
		request, err := lib.GetRequest[requests.CreateResource](r)

		resourceUuid, err := CreateResourceHandler(request, serverImpl.Context)
		if err != nil {
			lib.SetError(w, http.StatusNotFound, "Path not found: "+err.Error())
			return
		}
		w.Write([]byte(resourceUuid))
	})
}

func (serverImpl *ServerImpl) CreateUser(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type")

	DefaultHandler("POST", w, r, func() {
		request, err := lib.GetRequest[requests.CreateUser](r)

		if err != nil {
			lib.SetError(w, http.StatusNotFound, "Invalid request: "+err.Error())
			return
		}

		session, _ := serverImpl.Context.SessionStore.GetSession(r)

		userId, err := CreateUserHandler(request, serverImpl.Context)

		if err != nil {
			lib.SetError(w, http.StatusNotFound, "Error creating user: "+err.Error())
			return
		}

		session.SetAuthenticated(true)
		session.SetUserName(request.UserName)
		session.Save(r, w)

		w.Write([]byte(userId))
	})
}

func (serverImpl *ServerImpl) AuthUser(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type")

	DefaultHandler("POST", w, r, func() {
		session, err := serverImpl.Context.SessionStore.GetSession(r)

		request, err := lib.GetRequest[requests.AuthUser](r)

		if err != nil {
			lib.SetError(w, http.StatusNotFound, "Invalid request: "+err.Error())
			return
		}

		result, err := CheckAccountPassword(request, serverImpl.Context)

		if err != nil {
			lib.SetError(w, http.StatusUnauthorized, "Can not authorize user: "+err.Error())
			return
		}

		session.SetAuthenticated(true)
		session.SetUserName(request.UserName)
		session.Save(r, w)

		resultJson, _ := json.Marshal(result)
		w.WriteHeader(http.StatusOK)
		w.Write(resultJson)
	})
}

func (serverImpl *ServerImpl) DeleteUser(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type")

	DefaultHandler("DELETE", w, r, func() {
		session, err := serverImpl.Context.SessionStore.GetSession(r)

		request, err := lib.GetRequest[requests.DeleteUser](r)

		if err != nil {
			lib.SetError(w, http.StatusNotFound, "Invalid request: "+err.Error())
			return
		}

		result, err := DeleteUserHandler(request, serverImpl.Context)

		if err != nil {
			lib.SetError(w, http.StatusUnauthorized, "Can not delete user: "+err.Error())
			return
		}

		session.SetAuthenticated(false)

		resultJson, _ := json.Marshal(result)
		w.WriteHeader(http.StatusOK)
		w.Write(resultJson)
	})
}

func (serverImpl *ServerImpl) GetUserResources(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, user-id, offset, need-only-liked, path")

	DefaultHandler("GET", w, r, func() {
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
	})
}

func (serverImpl *ServerImpl) Logout(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type")

	DefaultHandler("GET", w, r, func() {
		session, _ := serverImpl.Context.SessionStore.GetSession(r)
		session.SetAuthenticated(false)
		session.SetUserName("")
		session.Save(r, w)
		w.WriteHeader(http.StatusOK)
	})
}

func (serverImpl *ServerImpl) GetUserMetadata(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, user-name")

	DefaultHandler("GET", w, r, func() {
		userName := r.Header.Get("User-Name")
		userMetaData, err := GetUserMetaData(userName, serverImpl.Context)
		if err != nil {
			lib.SetError(w, http.StatusUnauthorized, "Can not get user metadata: "+err.Error())
			return
		}

		resultJson, _ := json.Marshal(userMetaData)

		w.WriteHeader(http.StatusOK)
		w.Write(resultJson)
	})
}

func (serverImpl *ServerImpl) UpdateUserContacts(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type")

	DefaultHandler("POST", w, r, func() {
		request, err := lib.GetRequest[requests.UpdateUserContactsRequest](r)

		if err != nil {
			lib.SetError(w, http.StatusInternalServerError, "Invalid request: "+err.Error())
			return
		}

		err = UpdateUserContacts(request, serverImpl.Context)

		if err != nil {
			lib.SetError(w, http.StatusInternalServerError, "Error updating user contacts: "+err.Error())
			return
		}

		w.WriteHeader(http.StatusOK)
	})
}

func (serverImpl *ServerImpl) LikeResource(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type")

	DefaultHandler("POST", w, r, func() {
		requestBody, err := lib.GetRequest[requests.LikeResourceRequest](r)

		if err != nil {
			lib.SetError(w, http.StatusInternalServerError, "Invalid request: "+err.Error())
			return
		}
		err = LikeResource(requestBody, serverImpl.Context)

		if err != nil {
			log.Println("Error updating user contacts: ", err)
			w.WriteHeader(http.StatusNotFound)
		} else {
			w.WriteHeader(http.StatusOK)
		}
	})
}

func (serverImpl *ServerImpl) CreateFolder(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type")

	DefaultHandler("POST", w, r, func() {
		request, err := lib.GetRequest[requests.CreateFolder](r)

		if err != nil {
			lib.SetError(w, http.StatusInternalServerError, "Invalid request: "+err.Error())
			return
		}

		err = CreateFolderHandler(request, serverImpl.Context)

		if err != nil {
			lib.SetError(w, http.StatusInternalServerError, "Can not create folder: "+err.Error())
		}

		w.WriteHeader(http.StatusOK)
	})
}

func (serverImpl *ServerImpl) DeleteFolder(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, user-id")

	DefaultHandler("DELETE", w, r, func() {
		userId := r.Header.Get("User-Id")
		resourceUuid := r.PathValue("resourceUuid")

		err := DeleteFolder(userId, resourceUuid, serverImpl.Context)

		if err != nil {
			log.Println("Error deleting resource: ", err)
			w.WriteHeader(http.StatusNotFound)
		} else {
			w.WriteHeader(http.StatusOK)
		}
	})
}

func (serverImpl *ServerImpl) GetFolderUuid(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, path")

	DefaultHandler("GET", w, r, func() {
		path := r.Header.Get("Path")

		resourceUuid, err := GetFolderUuid(path, serverImpl.Context)

		if err != nil {
			lib.SetError(w, http.StatusInternalServerError, "Error getting folder uuid: "+err.Error())
		} else {
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(resourceUuid))
		}
	})
}

func (serverImpl *ServerImpl) DeleteResource(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, user-name, user-id")

	DefaultHandler("DELETE", w, r, func() {
		userName := r.Header.Get("User-Name")
		userId := r.Header.Get("User-Id")
		resourceUuid := r.PathValue("resourceUuid")
		err := DeleteResource(userId, userName, resourceUuid, serverImpl.Context)

		if err != nil {
			log.Println("Error deleting resource: ", err)
			lib.SetError(w, http.StatusInternalServerError, "Can not delete resource: "+err.Error())
		} else {
			w.WriteHeader(http.StatusOK)
		}
	})
}

func (serverImpl *ServerImpl) Subscribe(w http.ResponseWriter, r *http.Request) {
	w = SetDefaultHeaders(w, "content-type, subscriber-id, publisher-id")

	DefaultHandler("POST", w, r, func() {
		subsriberId := r.Header.Get("Subscriber-Id")
		publisherId := r.Header.Get("Publisher-Id")
		err := Subscribe(subsriberId, publisherId, serverImpl.Context)

		if err != nil {
			w.WriteHeader(http.StatusNotFound)
		} else {
			w.WriteHeader(http.StatusOK)
		}
	})
}
