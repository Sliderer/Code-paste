import axios from "axios";

class ClientServerAPI {
    async uploadDocument(userName: string, fileName: string, folderName: string, data: Uint8Array<ArrayBufferLike>) {
        await axios.post(`http://127.0.0.1:90/upload_resource/${userName}/${fileName}/${folderName}`, data);
    }
}

export default ClientServerAPI;