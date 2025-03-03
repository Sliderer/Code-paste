import { ZlibEncode } from "../../helpers/ZlibModule";
import ClientServerAPI from "../api/ClientServerAPI";

import ResourceCreationModel from "../models/ResourceCreationModel";
import { makeObservable, observable } from "mobx";
import { HighlightSharp } from "@mui/icons-material";
import customSesionStorage from "../../helpers/SessionController";
import ValidationResult from "../../helpers/ValidationResult";

export class ResourceCreationViewModel {
  @observable createdResource: string | undefined = undefined;
  private model: ResourceCreationModel;
  private clientAPI: ClientServerAPI;

  private language: string = "default";
  private ttl: number = 0;

  private languageCodes: Map<string, string> = new Map<string, string>([
    ["Обычный текст", "default"],
    ["Английский", "en"],
    ["Испанский", "es"],
    ["Русский", "ru"],
    ["Немецкий", "de"],
  ]);

  private TTLOptions: Map<string, number> = new Map<string, number>([
    ["Никогда не удалять", -1],
    ["1 час", 1],
    ["1 день", 24],
    ["1 неделя", 7 * 24],
    ["1 месяц", 30 * 24],
  ]);

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

  setLanguage(language: string) {
    this.language = this.languageCodes.get(language)!;
  }

  setTTL(ttl: string): void {
    this.ttl = this.TTLOptions.get(ttl)!;
  }

  getTranslateLanguages(): string[] {
    let result: string[] = [];
    this.languageCodes.forEach((_, key) => {
      result.push(key);
    });
    return result;
  }

  getTTLOptions(): string[] {
    let result: string[] = [];
    this.TTLOptions.forEach((_, key) => {
      result.push(key);
    });
    return result;
  }

  validateData(): ValidationResult {
    if (this.model.text.length === 0) {
      return {
        isValid: false,
        error: "Текст должен быть не пустым",
      };
    }

    if (this.model.fileName.length === 0) {
      return {
        isValid: false,
        error: "Имя файла не должно быть пустым",
      };
    }

    return {
      isValid: true,
      error: "",
    };
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
        this.language,
        this.model.fileName,
        this.model.password,
        folderPath,
        this.ttl,
        compressedText
      )
      .then((data) => {
        this.createdResource = data.data;
        this.model = new ResourceCreationModel();
      });
  }
}

export let resourceCreationViewModel = new ResourceCreationViewModel();
