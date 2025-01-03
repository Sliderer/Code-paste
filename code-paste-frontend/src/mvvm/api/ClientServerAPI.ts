import axios from "axios";

class ClientServerAPI {
    async uploadDocument(data: Uint8Array<ArrayBufferLike>) {
        await axios.post('http://127.0.0.1:80/upload_resource', data);
    }
}

export default ClientServerAPI;