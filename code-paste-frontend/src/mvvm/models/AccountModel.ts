import customSesionStorage from "../../helpers/SessionController";

class AccountModel {
    id: string = ''
    nickname: string = ''
    email: string = ''
    telegram: string = ''

    constructor() {
        const id = customSesionStorage.getUserId().getValue();
        const nickname = customSesionStorage.getUserName().getValue();
        this.id = id ? id : '';
        this.nickname = nickname ? nickname : '';
    }
}

export default AccountModel;