import { makeObservable, observable } from "mobx";
import AccountModel from "../models/AccountModel";

export class SearchViewModel {
    @observable account: AccountModel;

    constructor() {
        makeObservable(this);
        this.account = new AccountModel();
    }

    getUsersResources = () => {
        return [];
    }
}

export let searchViewModel = new SearchViewModel();