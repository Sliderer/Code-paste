import { action, isAction, makeObservable, observable } from "mobx";
import ResourceModel, {
  getDefaultResourceModel,
} from "../models/ResourceModel";
import { FetchingStatus } from "../../helpers/ResourceFetchingStatus";
import ClientServerAPI from "../api/ClientServerAPI";
import customSesionStorage from "../../helpers/SessionController";
import ResourcePreviewModel from "../models/ResourcePreviewModel";
import { Axios, AxiosResponse } from "axios";
export class ResourceDemonstrationViewModel {
  @observable isPasswordEntered = false;
  @observable inSharingMode = false;
  @observable isDeleted = false;
  @observable resourceModel: ResourceModel;
  @observable folderResourcesList: ResourcePreviewModel[] | undefined =
    undefined;
  @observable backRedirectOnDelete: string | undefined = undefined;
  @observable resourceAuthorRedirect: string | undefined = undefined;
  private clientServerAPI: ClientServerAPI;
  private isCurrentUserAuthor = false;

  constructor() {
    this.resourceModel = getDefaultResourceModel();
    this.clientServerAPI = new ClientServerAPI();
    makeObservable(this);
  }

  setResourceUuid = async (resourceUuid: string) => {
    this.resourceModel.resourceUuid = resourceUuid;
    let userId = customSesionStorage.getUserId().getValue();
    this.clientServerAPI
      .getResourceMetaData(userId !== null ? userId : "", resourceUuid)
      .then(async (data) => {
        this.resourceModel = {
          isPrivate:
            data.data.OwnerId == customSesionStorage.getUserId().getValue()
              ? false
              : data.data.IsPrivate,
          name: data.data.Name,
          resource: this.resourceModel.resource,
          resourceUuid: this.resourceModel.resourceUuid,
          owner: data.data.Owner,
          isLiked: data.data.IsLiked,
          highlightSetting: data.data.HighlightSetting,
          type: data.data.Type,
          ownerId: data.data.OwnerId,
          path: data.data.Path,
        };

        this.isCurrentUserAuthor =
          data.data.OwnerId == customSesionStorage.getUserId().getValue();

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

  getResource = (): ResourceModel => {
    return this.resourceModel!;
  };

  disableShareMode = () => {
    this.inSharingMode = false;
  };

  onCreateFolder = (folderName: string) => {
    this.clientServerAPI
      .createFolder(
        folderName,
        this.resourceModel.path
      )
      .then((_) => {
        this.getResourceData("");
      })
      .catch((e) => console.log(e));
  };

  onDeleteFolder = () => {
    this.clientServerAPI
      .deleteFolder(
        this.resourceModel.resourceUuid!
      )
      .then((_) => {
        let splittedPath = this.resourceModel.path.split("/");
        const newFolderPath =
          customSesionStorage.getUserName().getValue()! +
          "/" +
          splittedPath.slice(1, splittedPath.length - 2).join("/");
        this.onFolderChipsClick(newFolderPath).then((data) => {
          this.backRedirectOnDelete = data.data;
        });
      });
  };

  onFolderChipsClick = async (
    folderPath: string
  ): Promise<AxiosResponse<string>> => {
    let result = this.clientServerAPI.getFolderUuid(folderPath);
    result.catch((e) => console.log(e));

    return result;
  };

  getActions = () => {
    let actions = [
      {
        title: "Скачать",
        action: () => {
          this.downloadResource();
        },
        isActive: false,
      },
      {
        title: "Скопировать",
        action: async () => {
          await navigator.clipboard.writeText(
            this.resourceModel.resource!.text
          );
        },
        isActive: false,
      },
      {
        title: "Поделиться",
        action: () => {
          this.inSharingMode = true;
        },
        isActive: false,
      },
    ];

    if (customSesionStorage.getUserName().getValue() !== null) {
      actions.push({
        title: "В избранное",
        action: () => {
          this.clientServerAPI
            .likeResource(
              this.resourceModel.resourceUuid!
            )
            .catch((e) => console.log(e));
        },
        isActive: this.resourceModel.isLiked,
      });
    }

    if (this.isCurrentUserAuthor) {
      actions.push({
        title: "Удалить",
        action: () => {
          this.clientServerAPI
            .deleteResource(
              this.resourceModel.resourceUuid!
            )
            .catch((e) => console.log(e));
          this.isDeleted = true;
        },
        isActive: false,
      });
    }

    if (this.resourceModel.owner && this.resourceModel.owner !== "temp") {
      actions.push({
        title: this.resourceModel.owner,
        action: () => {
          console.log(this.resourceModel.owner);
          this.resourceAuthorRedirect = this.resourceModel.owner;
        },
        isActive: false,
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
      highlightSetting: this.resourceModel.highlightSetting,
      type: this.resourceModel.type,
      ownerId: this.resourceModel.ownerId,
      path: this.resourceModel.path,
    };

    if (this.resourceModel.type == "text") {
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
            highlightSetting: this.resourceModel.highlightSetting,
            type: this.resourceModel.type,
            ownerId: this.resourceModel.ownerId,
            path: this.resourceModel.path,
          };
        })
        .catch((reason) => console.log(reason));
    } else {
      this.clientServerAPI
        .getUserResources(
          this.resourceModel.ownerId,
          this.resourceModel.path,
          0,
          false
        )
        .then((data) => {
          this.folderResourcesList = [];
          data.data.Resources.map(
            (resource: {
              Title: string;
              Preview: string;
              ResourceUuid: string;
              Author: string;
              Type: string;
            }) => {
              this.refresh(resource);
            }
          );
        })
        .catch((e) => console.log(e));
    }
  };

  @action private refresh(resource: {
    Title: string;
    Preview: string;
    ResourceUuid: string;
    Author: string;
    Type: string;
  }) {
    this.folderResourcesList = [
      ...this.folderResourcesList!,
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

export let resourceDemonstrationViewModel =
  new ResourceDemonstrationViewModel();
