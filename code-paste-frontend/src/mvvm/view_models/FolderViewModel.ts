import { makeObservable, observable } from "mobx";
import FolderModel from "../models/FolderModel";

export class FolderViewModel {
    @observable folder: FolderModel;

    constructor() {
        makeObservable(this);
        this.folder = new FolderModel();
    }

    getUsersResources = () => {
        return this.folder.resourcesList;
    }
}

export let folderViewModel = new FolderViewModel();