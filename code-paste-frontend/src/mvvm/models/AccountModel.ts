import { extendObservable, makeObservable, observable } from "mobx";
import ResourcePreviewModel from "./ResourcePreviewModel";
import { getCurrentId, getCurrentNickname } from "../../helpers/SessionController";

class AccountModel {
    id: string = ''
    nickname: string = ''
    email: string = ''
    telegram: string = ''
    resourcesList: ResourcePreviewModel[] = []

    constructor() {
        extendObservable(this, {
            resourcesList: this.resourcesList
        });
        this.id = getCurrentId()!;
        this.nickname = getCurrentNickname()!;
    }
}

export default AccountModel;