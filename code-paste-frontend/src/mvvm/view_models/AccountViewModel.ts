import { action, makeObservable, observable } from "mobx";
import AccountModel from "../models/AccountModel";
import ClientServerAPI from "../api/ClientServerAPI";
import ResourcePreviewModel from "../models/ResourcePreviewModel";
import customSessionStorage from "../../helpers/SessionController";

export class AccountViewModel {
  @observable account: AccountModel | undefined = undefined;
  @observable.shallow resourcesList: ResourcePreviewModel[] = [];
  private clientServerAPI: ClientServerAPI;
  private loadedResourcesCount = 0;

  constructor() {
    this.clientServerAPI = new ClientServerAPI();

    makeObservable(this);
  }

  logOut = () => {
    this.clientServerAPI.logOut().then(
      _ => {
        customSessionStorage.getUserId().removeValue();
        customSessionStorage.getUserName().removeValue();
      }
    );
  }

  getUsersResources = () => {
    if (this.account === undefined) {
      this.account = new AccountModel();
    }

    this.clientServerAPI
      .getUserResources(this.account.id, this.loadedResourcesCount)
      .then((data) => {
        data.data.Resources.map((resource:  { Title: string; Preview: string, ResourceUuid: string, Author: string }) => {
          this.refresh(resource);
        });
        this.loadedResourcesCount += data.data.Resources.length;
      });
  };

  @action refresh(resource: { Title: string; Preview: string, ResourceUuid: string, Author: string }) {
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
}

export let accountViewModel = new AccountViewModel();
