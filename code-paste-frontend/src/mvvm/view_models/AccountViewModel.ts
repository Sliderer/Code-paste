import { action, makeObservable, observable } from "mobx";
import AccountModel from "../models/AccountModel";
import ClientServerAPI from "../api/ClientServerAPI";
import ResourcePreviewModel from "../models/ResourcePreviewModel";
import customSessionStorage from "../../helpers/SessionController";
import ValidationResult from "../../helpers/ValidationResult";

export class AccountViewModel {
  @observable account: AccountModel | undefined = undefined;
  @observable.shallow resourcesList: ResourcePreviewModel[] = [];
  @observable.shallow likedResourcesList: ResourcePreviewModel[] = [];
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
        telegram: data.data.Telegram,
      };
      this.getUsersResources();
      this.getLikedUsersResources();
    });
  };

  updateContact = (value: string, field: string) => {
    this.clientServerAPI
      .updateUserContacts(this.account!.id, value, field)
      .then((_) => {
        console.log("contacts updated");
      })
      .catch(e => {
        console.log(e)
      });
  };

  validateContact = (value: string, field: string): ValidationResult => {
    if (field === "email") {
      return this.validateEmail(value);
    } else {
      return this.validateTelegram(value);
    }
  };

  getUsersResources = () => {
    console.log('get all res')
    this.getUsersResourcesWithFilter(false);
  };

  getLikedUsersResources = () => {
    console.log('get liked res')
    this.getUsersResourcesWithFilter(true);
  };

  private getUsersResourcesWithFilter = (
    needOnlyLiked: boolean
  ) => {
    this.clientServerAPI
      .getUserResources(
        this.account!.id,
        this.loadedResourcesCount,
        needOnlyLiked
      )
      .then((data) => {
        data.data.Resources.map(
          (resource: {
            Title: string;
            Preview: string;
            ResourceUuid: string;
            Author: string;
          }) => {
            this.refresh(needOnlyLiked, resource);
          }
        );
        this.loadedResourcesCount += data.data.Resources.length;
      });
  };

  @action private refresh(
    needOnlyLiked: boolean,
    resource: {
      Title: string;
      Preview: string;
      ResourceUuid: string;
      Author: string;
    }
  ) {
    if (needOnlyLiked) {
      this.likedResourcesList = [
        ...this.likedResourcesList,
        {
          name: resource.Title,
          previewText: resource.Preview,
          resourceUuid: resource.ResourceUuid,
          author: resource.Author,
        },
      ]
    } else {
      this.resourcesList = [
        ...this.resourcesList,
        {
          name: resource.Title,
          previewText: resource.Preview,
          resourceUuid: resource.ResourceUuid,
          author: resource.Author,
        },
      ]
    }
  }

  private validateEmail = (value: string): ValidationResult => {
    if (value.length === 0) {
      return {
        isValid: false,
        error: "Поле не может быть пустым",
      };
    }

    return {
      isValid: true,
      error: "",
    };
  };

  private validateTelegram = (value: string): ValidationResult => {
    if (value.length === 0) {
      return {
        isValid: false,
        error: "Поле не может быть пустым",
      };
    }

    return {
      isValid: true,
      error: "",
    };
  };
}

export let accountViewModel = new AccountViewModel();
