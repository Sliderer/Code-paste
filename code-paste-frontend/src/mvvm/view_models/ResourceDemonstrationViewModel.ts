import { makeObservable, observable } from "mobx";
import ResourceModel from "../models/ResourceModel";
import { FetchingStatus } from "../../helpers/ResourceFetchingStatus";
import ClientServerAPI from "../api/ClientServerAPI";

export class ResourceDemonstrationViewModel {
  @observable isPasswordEntered = false;
  @observable resourceModel: ResourceModel = new ResourceModel();
  clientServerAPI: ClientServerAPI;

  constructor() {
    this.clientServerAPI = new ClientServerAPI();
    makeObservable(this);
  }

  setResourceId = async (resourceUuid: string) => {
    this.resourceModel.resourceUuid = resourceUuid;
    this.clientServerAPI
      .getResourceMetaData(resourceUuid)
      .then(async (data) => {
        this.resourceModel = {
          isPrivate: data.data.IsPrivate,
          resource: this.resourceModel.resource,
          resourceUuid: this.resourceModel.resourceUuid,
          owner: this.resourceModel.owner,
        };

        if (!data.data.isPrivate) {
          this.getResourceData("");
        }
      });
  };

  getResource = () => {
    return this.resourceModel.resource;
  };

  needToAskPassword() {
    return this.resourceModel.isPrivate === false || this.isPasswordEntered;
  }

  checkPassword = async (password: string) => {
    if (this.resourceModel.resourceUuid === undefined) {
      return;
    }

    this.clientServerAPI
      .checkResourcePassword(this.resourceModel.resourceUuid, password)
      .then(async (data) => {
        this.isPasswordEntered = true;
        await this.getResourceData(password);
      })
      .catch((_) => {
        console.log("Incorrect password");
      });
  };

  getResourceData = async (password: string) => {
    this.resourceModel = {
      isPrivate: this.resourceModel.isPrivate,
      resource: {
        text: "",
        status: FetchingStatus.InProgress,
      },
      resourceUuid: this.resourceModel.resourceUuid,
      owner: this.resourceModel.owner,
    };

    this.clientServerAPI
      .getResourceData(this.resourceModel.resourceUuid!, password)
      .then((data) => {
        this.resourceModel = {
          isPrivate: this.resourceModel.isPrivate,
          resource: {
            text: data.data,
            status: FetchingStatus.Finished,
          },
          resourceUuid: this.resourceModel.resourceUuid,
          owner: this.resourceModel.owner,
        };
      });
  };
}

export let resourceDemonstrationViewModel =
  new ResourceDemonstrationViewModel();
