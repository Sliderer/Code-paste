import axios, { HeadersDefaults } from "axios";

class ClientServerAPI {
    async uploadDocument(userName: string, fileName: string, password: string, folderName: string, data: Uint8Array<ArrayBufferLike>) {
        await axios.post(`http://127.0.0.1:90/upload_resource/${fileName}/${folderName}`, {
            Data: data,
            Owner: userName,
            Password: password
        });
    }
}

export default ClientServerAPI;