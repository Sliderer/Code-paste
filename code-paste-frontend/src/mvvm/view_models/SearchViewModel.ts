import { action, makeObservable, observable } from "mobx";
import AccountModel from "../models/AccountModel";
import SearchServerAPI from "../api/SearchServerAPI";
import ClientServerAPI from "../api/ClientServerAPI";
import ResourcePreviewModel from "../models/ResourcePreviewModel";
import customSesionStorage from "../../helpers/SessionController";

export class SearchViewModel {
  @observable resources: ResourcePreviewModel[] = [];
  private searchAPI: SearchServerAPI;
  private clientAPI: ClientServerAPI;

  constructor() {
    makeObservable(this);
    this.searchAPI = new SearchServerAPI();
    this.clientAPI = new ClientServerAPI();
  }

  search = (text: string) => {
    this.resources = [];
    this.searchAPI.search(text).then((data) => {
      let resourceUuids: string[] = data.data;
      resourceUuids.map((resourceUuid) => {
        this.clientAPI
          .getResourcePreview(resourceUuid)
          .then((data) => {
            this.refresh({
              Title: data.data.Title,
              Preview: data.data.Preview,
              ResourceUuid: resourceUuid,
              Author: data.data.Author,
              Type: "text",
            });
          })
          .catch((e) => console.log(e));
      });
    });
  };

  @action private refresh(resource: {
    Title: string;
    Preview: string;
    ResourceUuid: string;
    Author: string;
    Type: string;
  }) {
    this.resources = [
      ...this.resources,
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

export let searchViewModel = new SearchViewModel();
