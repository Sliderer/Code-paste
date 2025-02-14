import { action, makeObservable, observable } from "mobx";
import AccountModel from "../models/AccountModel";
import ClientServerAPI from "../api/ClientServerAPI";
import ResourcePreviewModel from "../models/ResourcePreviewModel";
import customSessionStorage from "../../helpers/SessionController";
import ValidationResult from "../../helpers/ValidationResult";

export class AccountViewModel {
  @observable account: AccountModel | undefined = undefined;
  @observable.shallow resourcesList: ResourcePreviewModel[] = [];
  @observable redirectToEnder: boolean = false;
  private clientServerAPI: ClientServerAPI;
  private loadedResourcesCount = 0;

  constructor() {
    this.clientServerAPI = new ClientServerAPI();
    makeObservable(this);
  }

  logOut = () => {
    this.clientServerAPI.logOut().then((_) => {
      customSessionStorage.getUserId().removeValue();
      customSessionStorage.getUserName().removeValue();
    });
  };

  subscribeOnPublications = (publisher: string) => {
    if (customSessionStorage.getUserId().getValue() == null) {
      this.redirectToEnder = true;
    }
  };

  getUserMetaData = (userName: string) => {
    this.clientServerAPI.getUserMetaData(userName).then((data) => {
      this.account = {
        id: data.data.UserId,
        userName: userName,
        email: data.data.Email,
        telegram: data.data.Telegram
      };
      this.getUsersResources();
    });
  };

  updateContact = (value: string, field: string) => {
    this.clientServerAPI.updateUserContacts(this.account!.id, value, field).then(
      _ => {
        console.log('contacts updated')
      }
    )
  }

  validateContact = (value: string, field: string) : ValidationResult => {
    if (field === "email") {
      return this.validateEmail(value);
    } else {
      return this.validateTelegram(value);
    }
  }

  getUsersResources = () => {
    this.clientServerAPI
      .getUserResources(this.account!.id, this.loadedResourcesCount)
      .then((data) => {
        data.data.Resources.map(
          (resource: {
            Title: string;
            Preview: string;
            ResourceUuid: string;
            Author: string;
          }) => {
            this.refresh(resource);
          }
        );
        this.loadedResourcesCount += data.data.Resources.length;
      });
  };

  @action refresh(resource: {
    Title: string;
    Preview: string;
    ResourceUuid: string;
    Author: string;
  }) {
    this.resourcesList = [
      ...this.resourcesList,
      {
        name: resource.Title,
        previewText: resource.Preview,
        resourceUuid: resource.ResourceUuid,
        author: resource.Author,
      },
    ];
  }

  private validateEmail = (value: string) : ValidationResult => {
    if (value.length === 0) {
      return {
        result: false,
        error: "Поле не может быть пустым"
      }
    }

    return {
      result: true,
      error: ""
    }
  }

  private validateTelegram = (value: string) : ValidationResult => {
    if (value.length === 0) {
      return {
        result: false,
        error: "Поле не может быть пустым"
      }
    }

    return {
      result: true,
      error: ""
    }
  }
}

export let accountViewModel = new AccountViewModel();
