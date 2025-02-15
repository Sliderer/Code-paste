import { action, isAction, makeObservable, observable } from "mobx";
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
  private clientServerAPI: ClientServerAPI;

  constructor() {
    this.resourceModel = getDefaultResourceModel();
    this.clientServerAPI = new ClientServerAPI();
    makeObservable(this);
  }

  setResourceUuid = async (resourceUuid: string) => {
    this.resourceModel.resourceUuid = resourceUuid;
    let userId = customSesionStorage.getUserId().getValue();
    this.clientServerAPI
      .getResourceMetaData(userId !== null ? userId : '', resourceUuid)
      .then(async (data) => {
        console.log(data.data)
        this.resourceModel = {
          isPrivate: !data.data.IsPrivateForCurrentUser
            ? false
            : data.data.IsPrivate,
          name: data.data.Name,
          resource: this.resourceModel.resource,
          resourceUuid: this.resourceModel.resourceUuid,
          owner: this.resourceModel.owner,
          isLiked: data.data.IsLiked,
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
        isActive: false
      },
      {
        title: "Скопировать",
        action: async () => {
          await navigator.clipboard.writeText(
            this.resourceModel.resource!.text
          );
        },
        isActive: false
      },
      {
        title: "Поделиться",
        action: () => {
          this.inSharingMode = true;
        },
        isActive: false
      },
    ];

    if (customSesionStorage.getUserName().getValue() !== null) {
      console.log('push', this.resourceModel.isLiked)
      actions.push({
        title: "В избранное",
        action: () => {
          this.clientServerAPI.likeResource(
            customSesionStorage.getUserId().getValue()!,
            this.resourceModel.resourceUuid!,
          );
        },
        isActive: this.resourceModel.isLiked
      });
    }

    if (this.resourceModel.owner && this.resourceModel.owner !== "temp") {
      actions.push({
        title: "Автор",
        action: () => {},
        isActive: false
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
      isLiked: this.resourceModel.isLiked,
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
          isLiked: this.resourceModel.isLiked,
        };
      })
      .catch((reason) => console.log(reason));
  };
}

export let resourceDemonstrationViewModel =
  new ResourceDemonstrationViewModel();
