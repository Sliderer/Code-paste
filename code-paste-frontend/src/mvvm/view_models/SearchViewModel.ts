import { makeObservable, observable } from "mobx";
import AccountModel from "../models/AccountModel";

export class SearchViewModel {
    @observable account: AccountModel | undefined = undefined;

    constructor() {
        makeObservable(this);
    }

    getUsersResources = () => {
        return [];
    }
}

export let searchViewModel = new SearchViewModel();