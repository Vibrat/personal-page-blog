import {
  AccountService,
  NewAccount,
  ChangePassword,
  GetAccounts
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

  public listAccounts(data: GetAccounts) {
    return this._account.getAccounts(
      data.offset,
      data.limit,
      data.group,
      data.name
    );
  }
}
