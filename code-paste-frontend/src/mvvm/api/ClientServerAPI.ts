import axios, { HeadersDefaults } from "axios";
import { CLIENT_BACKEND_ADDRESS } from "../../config/config";

class ClientServerAPI {
  constructor() {
    axios.defaults.baseURL = CLIENT_BACKEND_ADDRESS;
  }

  async uploadTextResource(
    userId: string,
    userName: string,
    language: string,
    fileName: string,
    password: string,
    folderName: string,
    ttl: number,
    highlightSetting: string,
    data: Uint8Array
  ) {
    let promise = await axios.post(`/upload_resource`, {
      UserName: userName,
      UserId: userId,
      Password: password,
      FileName: fileName,
      FolderName: folderName,
      Language: language,
      HighlightSetting: highlightSetting,
      TTL: ttl,
      Data: Array.from(data)
    }, {
      withCredentials: true,
    });

    return promise;
  }

  async getResourceMetaData(userId: string, resourceUuid: string) {
    let promise = await axios.get(`/get_resource_meta/${resourceUuid}`, {
      withCredentials: true,
      headers: {
        "User-Id": userId,
      },
    });

    return promise;
  }

  async getResourcePreview(resourceUuid: string) {
    let promise = await axios.get(`/get_resource_preview/${resourceUuid}`, {
      withCredentials: true,
    });

    return promise;
  }

  async checkResourcePassword(resourceUuid: string, password: string) {
    let promise = await axios.get(`/check_password/${resourceUuid}`, {
      withCredentials: true,
      headers: {
        Password: password,
      },
    });

    return promise;
  }

  async getResourceData(resourceUuid: string, password: string) {
    let promise = await axios.get(`/get_resource/${resourceUuid}`, {
      withCredentials: true,
      headers: {
        Password: password,
      },
    });

    return promise;
  }

  async createUser(userName: string, email: string, password: string) {
    let promise = await axios.post(
      `/create_user`,
      {
        UserName: userName,
        Password: password,
        Email: email,
      },
      {
        withCredentials: true,
      }
    );

    return promise;
  }

  async checkPassword(userName: string, password: string) {
    let promise = await axios.post(
      `/auth`,
      {
        UserName: userName,
        Password: password,
      },
      {
        withCredentials: true,
      }
    );

    return promise;
  }

  async getUserResources(
    userId: string,
    path: string,
    offset: number,
    needOnlyLiked: boolean
  ) {
    let promise = await axios.get(`/get_resources`, {
      withCredentials: true,
      headers: {
        Path: path,
        Offset: offset,
        "User-Id": userId,
        "Need-Only-Liked": needOnlyLiked === true ? "true" : "false",
      },
    });

    return promise;
  }

  async logOut() {
    let promise = await axios.get(`/logout`, {
      withCredentials: true,
    });

    return promise;
  }

  async getUserMetaData(userName: string) {
    let promise = await axios.get(`/get_user_metadata`, {
      withCredentials: true,
      headers: {
        "User-Name": userName,
      },
    });

    return promise;
  }

  async updateUserContacts(value: string, field: string) {
    let promise = await axios.post(
      `/update_user_contacts`,
      {
        Value: value,
        Field: field,
      },
      {
        withCredentials: true,
      }
    );

    return promise;
  }

  async likeResource(resourceUuid: string) {
    let promise = await axios.post(
      `/like_resource`,
      {
        Resourceuuid: resourceUuid,
      },
      {
        withCredentials: true,
      }
    );

    return promise;
  }

  async deleteResource(resourceUuid: string) {
    let promise = await axios.delete(`/delete_resource/${resourceUuid}`, {
      withCredentials: true
    });

    return promise;
  }

  async createFolder(
    folderName: string,
    folderPath: string
  ) {
    console.log('with creads')
    let promise = await axios.post(
      `/create_folder`,
      {
        FolderName: folderName,
        FolderPath: folderPath,
      },
      {
        withCredentials: true
      }
    );

    return promise;
  }

  async deleteFolder(resourceUuid: string) {
    let promise = await axios.delete(`/delete_folder/${resourceUuid}`, {
      withCredentials: true
    });

    return promise;
  }

  async getFolderUuid(path: string) {
    let promise = await axios.get(`/get_folderUuid`, {
      withCredentials: true,
      headers: {
        Path: path,
      },
    });

    return promise;
  }

  async subscribeOnPublications(publisher_id: string) {
    let promise = await axios.post(
      `/subscribe`,
      {},
      {
        withCredentials: true,
        headers: {
          "Publisher-Id": publisher_id,
        },
      }
    );

    return promise;
  }
}

export default ClientServerAPI;
