import { action, makeObservable, observable } from "mobx";
import AccountModel from "../models/AccountModel";
import ClientServerAPI from "../api/ClientServerAPI";
import { getCurrentNickname } from "../../helpers/SessionController";

export class AccountViewModel {
  @observable.shallow account: AccountModel;
  private clientServerAPI: ClientServerAPI;
  private loadedResourcesCount = 0;

  constructor() {
    makeObservable(this);
    this.clientServerAPI = new ClientServerAPI();
    this.account = new AccountModel();
  }

  @action getUsersResources = () => {
    this.clientServerAPI
      .getUserResources(this.account.id, this.loadedResourcesCount)
      .then(action((data) => {
        data.data.Resources.map((resource: { Title: any; Preview: any }) => {
          this.account.resourcesList.push({
            name: resource.Title,
            previewText: resource.Preview,
            resourceUuid: "",
            author: "",
          });
        });
        this.loadedResourcesCount += data.data.Resources.length;
        console.log('updated')
      }));
  };
}

export let accountViewModel = new AccountViewModel();
