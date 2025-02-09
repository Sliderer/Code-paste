import { makeObservable, observable } from "mobx";
import ResourceModel, {
  getDefaultResourceModel,
} from "../models/ResourceModel";
import { FetchingStatus } from "../../helpers/ResourceFetchingStatus";
import ClientServerAPI from "../api/ClientServerAPI";
import customSesionStorage from "../../helpers/SessionController";
export class ResourceDemonstrationViewModel {
  @observable isPasswordEntered = false;
  @observable inSharingMode = false;
  @observable resourceModel: ResourceModel;
  clientServerAPI: ClientServerAPI;

  constructor() {
    this.resourceModel = getDefaultResourceModel();
    this.clientServerAPI = new ClientServerAPI();
    makeObservable(this);
  }

  setResourceUuid = async (resourceUuid: string) => {
    this.resourceModel.resourceUuid = resourceUuid;
    this.clientServerAPI
      .getResourceMetaData(resourceUuid)
      .then(async (data) => {
        this.resourceModel = {
          isPrivate: !data.data.IsPrivateForCurrentUser
            ? false
            : data.data.IsPrivate,
          name: data.data.Name,
          resource: this.resourceModel.resource,
          resourceUuid: this.resourceModel.resourceUuid,
          owner: this.resourceModel.owner,
        };

        if (this.resourceModel.isPrivate === false) {
          this.getResourceData("");
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  clearResource = () => {
    this.resourceModel = getDefaultResourceModel();
  };

  getResource = () => {
    return this.resourceModel.resource!;
  };

  disableShareMode = () => {
    this.inSharingMode = false;
  };

  getActions = () => {
    let actions = [
      {
        title: "Скачать",
        action: () => {
          this.downloadResource();
        },
      },
      {
        title: "Скопировать",
        action: async () => {
          await navigator.clipboard.writeText(
            this.resourceModel.resource!.text
          );
        },
      },
      {
        title: "Поделиться",
        action: () => {
          this.inSharingMode = true;
        },
      },
    ];

    if (customSesionStorage.getUserName().getValue() !== null) {
      actions.push({
        title: "В избранное",
        action: () => {},
      });
    }

    if (this.resourceModel.owner && this.resourceModel.owner !== "temp") {
      actions.push({
        title: "Автор",
        action: () => {},
      });
    }

    return actions;
  };

  needToAskPassword() {
    if (this.isPasswordEntered === true) {
      return false;
    }

    return this.resourceModel.isPrivate === true;
  }

  checkPassword = async (password: string) => {
    if (this.resourceModel.resourceUuid === undefined) {
      return;
    }

    this.clientServerAPI
      .checkResourcePassword(this.resourceModel.resourceUuid, password)
      .then(async (data) => {
        this.isPasswordEntered = data.data.Result;
        if (data.data.Result) {
          this.getResourceData(password);
        }
      })
      .catch((reason) => console.log(reason));
  };

  downloadResource = () => {
    const url = window.URL.createObjectURL(
      new Blob([this.resourceModel.resource.text], { type: "text/plain" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", this.resourceModel.name!);
    document.body.appendChild(link);
    link.click();
  };

  getResourceData = async (password: string) => {
    this.resourceModel = {
      isPrivate: this.resourceModel.isPrivate,
      name: this.resourceModel.name,
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
          name: this.resourceModel.name,
          resource: {
            text: data.data,
            status: FetchingStatus.Finished,
          },
          resourceUuid: this.resourceModel.resourceUuid,
          owner: this.resourceModel.owner,
        };
      })
      .catch((reason) => console.log(reason));
  };
}

export let resourceDemonstrationViewModel =
  new ResourceDemonstrationViewModel();
