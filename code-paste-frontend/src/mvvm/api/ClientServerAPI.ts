import axios, { HeadersDefaults } from "axios";

class ClientServerAPI {
  constructor() {
    axios.defaults.baseURL = "http://127.0.0.1:90";
  }

  async uploadDocument(
    userId: string,
    userName: string,
    fileName: string,
    password: string,
    folderName: string,
    data: Uint8Array
  ) {
    let promise = await axios.post(`/upload_resource`, data, {
      withCredentials: true,
      headers: {
        UserId: userId,
        UserName: userName,
        Password: password,
        FileName: fileName,
        FolderName: folderName,
      },
    });

    return promise;
  }

  async getResourceMetaData(resourceUuid: string) {
    let promise = await axios.get(`/get_resource_meta/${resourceUuid}`, {
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
      {},
      {
        withCredentials: true,
        headers: {
          UserName: userName,
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
        UserName: userName,
        Password: password,
      },
    });

    return promise;
  }

  async getUserResources(userId: string, offset: number) {
    let promise = await axios.get(`/get_resources`, {
      withCredentials: true,
      headers: {
        Offset: offset,
        UserId: userId,
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
        UserName: userName,
      },
    });

    return promise;
  }

  async updateUserContacts(userId: string, value: string, field: string) {
    let promise = await axios.post(
      `/update_user_contacts`,
      {},
      {
        withCredentials: true,
        headers: {
          UserId: userId,
          Value: value,
          Field: field,
        },
      }
    );

    return promise;
  }

  async likeResource(userId: string, resourceUuid: string) {
    let promise = await axios.post(
      `/like_resource`,
      {
        UserId: userId,
        ResourceUuid: resourceUuid,
      },
      {
        withCredentials: true,
      }
    );

    return promise;
  }
}

export default ClientServerAPI;
