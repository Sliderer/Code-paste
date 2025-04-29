import { makeObservable, observable } from "mobx";
import ClientServerAPI from "../api/ClientServerAPI";
import customSesionStorage from "../../helpers/SessionController";
import ValidationResult from "../../helpers/ValidationResult";

export class EnterViewModel {
  private clientServerAPI: ClientServerAPI;
  @observable userName: string | undefined = undefined;
  @observable errorMessage: string = '';

  constructor() {
    makeObservable(this);
    this.clientServerAPI = new ClientServerAPI();
  }

  validateData(userName: string, password: string): ValidationResult {
    if (userName.length === 0) {
      return {
        isValid: false,
        error: "Введите имя",
      };
    }

    if (password.length === 0) {
      return {
        isValid: false,
        error: "Введите пароль",
      };
    }

    return {
      isValid: true,
      error: "",
    };
  }

  checkPassword(userName: string, password: string) {
    this.clientServerAPI
      .checkPassword(userName, password)
      .then((data) => {
        if (data.data.Result) {
          this.userName = userName;
          customSesionStorage.getUserName().setValue(userName);
          customSesionStorage.getUserId().setValue(data.data.UserId);
        } else {
          this.errorMessage = 'Пользователя не существует, либо введен неверный пароль'
        }
      })
      .catch((e) => console.log(e));
  }
}

export let enterViewModel = new EnterViewModel();
