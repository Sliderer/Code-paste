import { makeObservable, observable } from "mobx";
import AccountModel from "../models/AccountModel";

export class AccountViewModel {
    @observable account: AccountModel;

    constructor() {
        makeObservable(this);
        this.account = new AccountModel();
    }

    getUsersResources = () => {
        return this.account.resourcesList;
    }
}

export let accountViewModel = new AccountViewModel();