import axios, { HeadersDefaults } from "axios";

class ClientServerAPI {
  async uploadDocument(
    userName: string,
    fileName: string,
    password: string,
    folderName: string,
    data: Uint8Array
  ) {
    let promise = await axios.post(
      `http://127.0.0.1:90/upload_resource`,
      data,
      {
        headers: {
          User: userName,
          Password: password,
          FileName: fileName,
          FolderName: folderName,
        },
      }
    );

    return promise;
  }

  async getResourceMetaData(resourceUuid: string) {
    let promise = await axios.get(
      `http://127.0.0.1:90/get_resource_meta/${resourceUuid}`
    );

    return promise;
  }

  async checkResourcePassword(resourceUuid: string, password: string) {
    let promise = await axios.get(
      `http://127.0.0.1:90/check_password/${resourceUuid}`,
      {
        headers: {
          'Password': password
        }
      }
    );

    return promise;
  }

  async getResourceData(resourceUuid: string, password: string) {
    let promise = await axios.get(
      `http://127.0.0.1:90/get_resource/${resourceUuid}`,
      {
        headers: {
          'Password': password
        }
      }
    );

    return promise;
  }
}

export default ClientServerAPI;
