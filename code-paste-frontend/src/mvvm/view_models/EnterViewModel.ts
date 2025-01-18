import { makeObservable } from "mobx";

export class EnterViewModel {
    constructor() {
        makeObservable(this);
    }
}

export let enterViewModel = new EnterViewModel();