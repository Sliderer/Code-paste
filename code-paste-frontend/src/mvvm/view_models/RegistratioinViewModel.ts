import { makeObservable, observable } from "mobx";
import { ZlibEncode } from "../../helpers/ZlibModule";
import ClientServerAPI from "../api/ClientServerAPI";
import ResourceCreationModel from "../models/ResourceCreationModel";
import { setCurrentId, setCurrentNickname } from "../../helpers/SessionController";

export class RegistrationViewModel {
  @observable userName: string | undefined = undefined;
  private clientServerAPI: ClientServerAPI;

  constructor() {
    makeObservable(this);
    this.clientServerAPI = new ClientServerAPI();
  }

  createUser(userName: string, email: string, password: string) {
    this.clientServerAPI.createUser(userName, email, password).then((data) => {
      this.userName = userName;
      setCurrentNickname(userName);
      setCurrentId(data.data)
    });
  }
}

export let registrationViewModel = new RegistrationViewModel();
