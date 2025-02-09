import { makeObservable, observable } from "mobx";
import ClientServerAPI from "../api/ClientServerAPI";
import customSesionStorage from "../../helpers/SessionController";

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
      customSesionStorage.getUserName().setValue(userName);
      customSesionStorage.getUserId().setValue(data.data)
    });
  }
}

export let registrationViewModel = new RegistrationViewModel();
