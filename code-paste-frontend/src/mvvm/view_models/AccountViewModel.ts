import { action, makeObservable, observable } from "mobx";
import AccountModel from "../models/AccountModel";
import ClientServerAPI from "../api/ClientServerAPI";
import ResourcePreviewModel from "../models/ResourcePreviewModel";
import customSessionStorage from "../../helpers/SessionController";
import ValidationResult from "../../helpers/ValidationResult";

export class AccountViewModel {
  @observable account: AccountModel | undefined = undefined;
  @observable resourcesList: ResourcePreviewModel[] | undefined = undefined;
  @observable likedResourcesList: ResourcePreviewModel[] | undefined =
    undefined;
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
    this.clientServerAPI
      .logOut()
      .then((_) => {
        customSessionStorage.getUserId().removeValue();
        customSessionStorage.getUserName().removeValue();
      })
      .catch((e) => console.log(e));
  };

  subscribeOnPublications = (publisher: string) => {
    let userId = customSessionStorage.getUserId().getValue();
    if (userId == null) {
      this.redirectToEnder = true;
    }

    this.clientServerAPI
      .subscribeOnPublications(this.account!.id)
      .catch((e) => console.log(e));
  };

  getUserMetaData = (userName: string) => {
    this.clientServerAPI
      .getUserMetaData(userName)
      .then((data) => {
        this.account = {
          id: data.data.UserId,
          userName: userName,
          email: data.data.Email,
          telegram: data.data.Telegram,
        };
        this.updateResourcesLists();
      })
      .catch((e) => console.log(e));
  };

  updateResourcesLists = () => {
    this.loadedResourcesCount = 0;
    this.resourcesList = undefined;
    this.likedResourcesList = undefined;
    this.getUsersResources();
    if (
      this.account &&
      this.account.id === customSessionStorage.getUserId().getValue()
    ) {
      this.getLikedUsersResources();
    } else {
      this.likedResourcesList = [];
    }
  };

  updateContact = (value: string, field: string) => {
    this.clientServerAPI
      .updateUserContacts(value, field)
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
  };

  onCreateFolder = (folderName: string) => {
    this.clientServerAPI
      .createFolder(
        folderName,
        this.defaultPath
      )
      .then((_) => {
        if (this.account !== undefined) {
          this.updateResourcesLists();
        }
      });
  };

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

        this.resourcesList = this.resourcesList ?? [];
        this.likedResourcesList = this.likedResourcesList ?? [];

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
        ...(this.likedResourcesList ?? []),
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
        ...(this.resourcesList ?? []),
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
