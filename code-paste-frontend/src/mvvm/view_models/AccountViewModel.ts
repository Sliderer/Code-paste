import { action, makeObservable, observable } from "mobx";
import AccountModel from "../models/AccountModel";
import ClientServerAPI from "../api/ClientServerAPI";
import ResourcePreviewModel from "../models/ResourcePreviewModel";
import customSessionStorage from "../../helpers/SessionController";
import ValidationResult from "../../helpers/ValidationResult";

export class AccountViewModel {
  @observable account: AccountModel | undefined = undefined;
  @observable resourcesList: ResourcePreviewModel[] = [];
  @observable likedResourcesList: ResourcePreviewModel[] = [];
  @observable redirectToEnder: boolean = false;
  @observable createFolder: boolean = false;
  private clientServerAPI: ClientServerAPI;
  private loadedResourcesCount: number = 0;
  private defaultPath: string = "default";

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
      this.updateResourcesLists();
    });
  };

  updateResourcesLists = () => {
    this.loadedResourcesCount = 0;
    this.resourcesList = [];
    this.likedResourcesList = [];
    this.getUsersResources();
    this.getLikedUsersResources();
  };

  updateContact = (value: string, field: string) => {
    this.clientServerAPI
      .updateUserContacts(this.account!.id, value, field)
      .then((_) => {
        console.log("contacts updated");
      })
      .catch((e) => {
        console.log(e);
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
    this.getUsersResourcesWithFilter(false);
  };

  getLikedUsersResources = () => {
    this.getUsersResourcesWithFilter(true);
  };

  setOnCreateFolder = (value: boolean) => {
    this.createFolder = value;
  }

  onCreateFolder = (folderName: string) => {
    this.clientServerAPI.createFolder(
      customSessionStorage.getUserName().getValue()!,
      customSessionStorage.getUserId().getValue()!,
      folderName,
      this.defaultPath
    )
  }

  private getUsersResourcesWithFilter = (needOnlyLiked: boolean) => {
    this.clientServerAPI
      .getUserResources(
        this.account!.id,
        this.defaultPath,
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
            Type: string;
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
      Type: string;
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
          type: resource.Type,
        },
      ];
    } else {
      this.resourcesList = [
        ...this.resourcesList,
        {
          name: resource.Title,
          previewText: resource.Preview,
          resourceUuid: resource.ResourceUuid,
          author: resource.Author,
          type: resource.Type,
        },
      ];
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
