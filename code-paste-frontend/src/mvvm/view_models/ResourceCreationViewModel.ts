import { ZlibEncode } from "../../helpers/ZlibModule";
import ClientServerAPI from "../api/ClientServerAPI";

import ResourceCreationModel from "../models/ResourceCreationModel";
import { makeObservable, observable } from "mobx";
import { HighlightSharp } from "@mui/icons-material";
import customSesionStorage from "../../helpers/SessionController";

export class ResourceCreationViewModel {
  @observable createdResource: string | undefined = undefined;
  private model: ResourceCreationModel;
  private clientAPI: ClientServerAPI;

  constructor() {
    this.uploadResource = this.uploadResource.bind(this);
    this.setText = this.setText.bind(this);
    this.getText = this.getText.bind(this);
    this.clientAPI = new ClientServerAPI();
    this.model = new ResourceCreationModel();
    makeObservable(this);
  }

  setText(text: string) {
    this.model.text = text;
  }

  getText() {
    return this.model.text;
  }

  setFileName(fileName: string) {
    this.model.fileName = fileName;
  }

  setFolder(folderPath: string) {
    this.model.folderPath = folderPath;
  }

  setPassword(password: string) {
    this.model.password = password;
  }

  async uploadResource() {
    const compressedText = await ZlibEncode(this.model.text);
    let userId = customSesionStorage.getUserId().getValue();
    let userName = customSesionStorage.getUserName().getValue();

    if (userId === null) {
      userId = "temp";
      userName = "temp";
    }
    let folderPath = this.model.folderPath;
    if (folderPath.length === 0) {
      folderPath = "default";
    }

    this.clientAPI
      .uploadDocument(
        userId!,
        userName!,
        this.model.fileName,
        this.model.password,
        folderPath,
        compressedText
      )
      .then((data) => {
        this.createdResource = data.data;
        this.model = new ResourceCreationModel();
      });
  }
}

export let resourceCreationViewModel = new ResourceCreationViewModel();
