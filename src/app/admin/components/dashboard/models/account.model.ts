
import {
    AccountService,
    NewAccount,
    ChangePassword
} from "../../../services/account.service";

export class AccountModel {
    private service: AccountService;

    constructor(private _account: AccountService) {
        this.service = _account;
    }

    public createAccount(data: NewAccount) {
        return this.service.newAccount(data);
    }

    public deleteAccount(data: string) {
        return this._account.deleteAccount(data);
    }

    public changePasswordByAdmin(data: ChangePassword) {
        return this._account.changePassword(data);
    }
}