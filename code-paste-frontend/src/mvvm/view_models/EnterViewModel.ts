import { makeObservable, observable } from "mobx";
import ClientServerAPI from "../api/ClientServerAPI";
import {
  setCurrentId,
  setCurrentNickname,
} from "../../helpers/SessionController";

export class EnterViewModel {
  private clientServerAPI: ClientServerAPI;
  @observable userName: string | undefined = undefined;

  constructor() {
    makeObservable(this);
    this.clientServerAPI = new ClientServerAPI();
  }

  checkPassword(userName: string, password: string) {
    this.clientServerAPI.checkPassword(userName, password).then((data) => {
      if (data.data.Result) {
        this.userName = userName;
        setCurrentNickname(userName);
        setCurrentId(data.data.UserId);
      }
    });
  }
}

export let enterViewModel = new EnterViewModel();
