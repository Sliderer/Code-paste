import { action, makeObservable, observable } from "mobx";
import ClientHttpAPI from "../api/ClientHttpAPI";
import ResourceModel from "../models/ResourceModel";
import { FetchingStatus } from "../../helpers/ResourceFetchingStatus";

export class ResourceDemonstrationViewModel {
    @observable isOpened: boolean;
    @observable
    resourceModel: ResourceModel = new ResourceModel();
    clientAPI: ClientHttpAPI;

    constructor() {
        makeObservable(this);
        this.clientAPI = new ClientHttpAPI();
        this.isOpened = false;
    }

    setResourceId = (value: string) => {
        this.resourceModel.resourceId = value;
    }

    getResource = () => {
        if (this.resourceModel.resource.status == FetchingStatus.NotStarted) {
            this.downloadResource();
        }
        return this.resourceModel.resource;
    }

    downloadResource = () => {
        
    }

    checkPassword = async (password: string) => {
        if (this.resourceModel.resourceId === undefined) {
            return;
        }
        const checkResult = await this.clientAPI.checkResourcePassword(this.resourceModel.resourceId, password);
        this.isOpened = checkResult;
        console.log(this.isOpened)
    }
}

export let resourceDemonstrationViewModel = new ResourceDemonstrationViewModel();