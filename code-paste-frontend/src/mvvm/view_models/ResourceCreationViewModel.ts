import { SHA256 } from "crypto-ts";
import { getCurrentNickname } from "../../helpers/SessionController";
import { ZlibEncode } from "../../helpers/ZlibModule";
import ClientServerAPI from "../api/ClientServerAPI";

import ResourceCreationModel from "../models/ResourceCreationModel";

export class ResourceCreationViewModel {
    private model: ResourceCreationModel;
    private clientAPI: ClientServerAPI;

    constructor() {
        this.uploadResource = this.uploadResource.bind(this);
        this.setText = this.setText.bind(this);
        this.getText = this.getText.bind(this);
        this.clientAPI = new ClientServerAPI();
        this.model = new ResourceCreationModel();
    }

    setText(text: string) {
        this.model.text = text;
    }

    getText() {
        return this.model.text;
    }

    setFileName(fileName: string) {
        this.model.fileName = fileName
    }

    setFolder(folderPath: string) {
        this.model.folderPath = folderPath
    }

    setPassword(password: string) {
        this.model.password = password
    }

    async uploadResource() {
        const compressedText = await ZlibEncode(this.model.text);
        let userName = getCurrentNickname();
        if (!userName) {
            userName = "temp";
        }
        let folderPath = this.model.folderPath;
        if (folderPath.length === 0) {
            folderPath = 'default';
        }
        const password = SHA256(this.model.password).string
        this.clientAPI.uploadDocument(userName, this.model.fileName, password, folderPath, compressedText);
    }

}

export let resourceCreationViewModel = new ResourceCreationViewModel();