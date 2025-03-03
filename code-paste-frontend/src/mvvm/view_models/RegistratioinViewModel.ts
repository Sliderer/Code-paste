import { makeObservable, observable } from "mobx";
import ClientServerAPI from "../api/ClientServerAPI";
import customSesionStorage from "../../helpers/SessionController";
import ValidationResult from "../../helpers/ValidationResult";

export class RegistrationViewModel {
  @observable userName: string | undefined = undefined;
  private clientServerAPI: ClientServerAPI;
  private emailPattern = new RegExp(
    "^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$"
  );
  private passwordLattersPattern = new RegExp("^.*[a-zA-Z].*$");
  private passwordNumbersPattern = new RegExp("^.*[0-9].*$");

  constructor() {
    makeObservable(this);
    this.clientServerAPI = new ClientServerAPI();
  }

  validateData(
    userName: string,
    email: string,
    password: string
  ): ValidationResult {
    if (userName.length < 3) {
      return {
        isValid: false,
        error: "Длина имени должна быть не меньше трех символов",
      };
    }

    if (email.match(this.emailPattern) == null) {
      return {
        isValid: false,
        error: "Введите корректный email",
      };
    }

    if (password.length < 5) {
      return {
        isValid: false,
        error: "Длина пароля должна быть не меньше пяти символов",
      };
    }

    if (
      password.match(this.passwordLattersPattern) == null ||
      password.match(this.passwordNumbersPattern) == null
    ) {
      return {
        isValid: false,
        error: "Пароль должен состоять из ластинский букв и цифр",
      };
    }

    return {
      isValid: true,
      error: "",
    };
  }

  async createUser(userName: string, email: string, password: string): Promise<boolean> {
    let result = true;
    await this.clientServerAPI
      .createUser(userName, email, password)
      .then((data) => {
        this.userName = userName;
        customSesionStorage.getUserName().setValue(userName);
        customSesionStorage.getUserId().setValue(data.data);
      })
      .catch((_) => {
        result = false;
      });
    return result;
  }
}

export let registrationViewModel = new RegistrationViewModel();
