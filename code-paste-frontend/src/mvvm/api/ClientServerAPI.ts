import axios, { HeadersDefaults } from "axios";

class ClientServerAPI {
  constructor() {
    axios.defaults.baseURL = "http://10.5.0.3:90";
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
    let promise = await axios.post(`/upload_resource`, data, {
      withCredentials: true,
      headers: {
        "User-id": userId,
        "User-Name": userName,
        Password: password,
        Language: language,
        "File-Name": fileName,
        "Folder-Name": folderName,
        TTL: ttl,
        "Highlight-Setting": highlightSetting,
      },
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
      {},
      {
        withCredentials: true,
        headers: {
          "User-Name": userName,
          Password: password,
          Email: email,
        },
      }
    );

    return promise;
  }

  async checkPassword(userName: string, password: string) {
    let promise = await axios.get(`/check_account_password`, {
      withCredentials: true,
      headers: {
        "User-Name": userName,
        Password: password,
      },
    });

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

  async updateUserContacts(userId: string, value: string, field: string) {
    let promise = await axios.post(
      `/update_user_contacts`,
      {
        UserId: userId,
        Value: value,
        Field: field,
      },
      {
        withCredentials: true,
      }
    );

    return promise;
  }

  async likeResource(userId: string, resourceUuid: string) {
    let promise = await axios.post(
      `/like_resource`,
      {
        UserId: userId,
        Resourceuuid: resourceUuid,
      },
      {
        withCredentials: true,
      }
    );

    return promise;
  }

  async deleteResource(userId: string, userName: string, resourceUuid: string) {
    let promise = await axios.delete(`/delete_resource/${resourceUuid}`, {
      headers: {
        "User-Id": userId,
        "User-Name": userName,
      },
    });

    return promise;
  }

  async createFolder(
    userName: string,
    userId: string,
    folderName: string,
    folderPath: string
  ) {
    let promise = await axios.post(
      `/create_folder`,
      {},
      {
        headers: {
          "User-Name": userName,
          "User-Id": userId,
          "Folder-Name": folderName,
          "Folder-Path": folderPath,
        },
      }
    );

    return promise;
  }

  async deleteFolder(userId: string, resourceUuid: string) {
    let promise = await axios.delete(`/delete_folder/${resourceUuid}`, {
      headers: {
        "User-Id": userId,
      },
    });

    return promise;
  }

  async getFolderUuid(path: string) {
    let promise = await axios.get(`/get_folderUuid`, {
      headers: {
        Path: path,
      },
    });

    return promise;
  }

  async subscribeOnPublications(subsriber_id: string, publisher_id: string) {
    let promise = await axios.post(`/subscribe`, {}, {
      headers: {
        'Subscriber-Id': subsriber_id,
        'Publisher-Id': publisher_id
      }
    });

    return promise;
  }
}

export default ClientServerAPI;
