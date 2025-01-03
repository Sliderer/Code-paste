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

    async uploadResource() {
        const compressedText = await ZlibEncode(this.model.text);
        this.clientAPI.uploadDocument(compressedText);
    }

}

export let resourceCreationViewModel = new ResourceCreationViewModel();