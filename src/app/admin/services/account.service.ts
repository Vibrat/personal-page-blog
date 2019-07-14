import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";
import { AppConfig } from "~/app/app-config.service";

export interface AccountsResponse {}

export interface NewAccount {
  username: string;
  password: string;
}

export interface NewAccountResponse {
  success: boolean;
  token: string;
}

export interface AccountDeleteResponse {
  success: boolean;
  message: string;
}

export interface AccountExistResponse {
  success: boolean;
  message?: string;
}

@Injectable()
export class AccountService {
  data: Observable<AccountsResponse>;

  constructor(private _auth: AuthService, private _http: HttpClient) {}

  public getAccounts(offset = 0, limit = 20): Observable<AccountsResponse> {
    const apiListAccounts = `${AppConfig.get(
      "domain"
    )}api=account/basic-auth/list&limit=${limit}&offset=${offset}&token=${this._auth.getToken()}`;
    return (this.data = <Observable<AccountsResponse>>(
      this._http.get(apiListAccounts)
    ));
  }

  public newAccount(accountInfo: NewAccount): Observable<NewAccountResponse> {
    const apiNewAccount = `${AppConfig.get(
      "domain"
    )}api=account/basic-auth/new&token=${this._auth.getToken()}`;
    let data = new FormData();
    data.append('username', accountInfo.username);
    data.append('password', accountInfo.password);
    return <Observable<NewAccountResponse>>this._http.post(apiNewAccount, data);
  }

  public deleteAccount(username: string): Observable<AccountDeleteResponse> {
    const apiDeleteAccount = `${AppConfig.get(
      "domain"
    )}api=account/basic-auth/delete&username=${username}&token=${this._auth.getToken()}`;
    return <Observable<AccountDeleteResponse>>(
      this._http.delete(apiDeleteAccount)
    );
  }

  public checkAccount(username: string): Observable<AccountExistResponse> {
    const apiCheckAccount = `${AppConfig.get(
      "domain"
    )}api=account/basic-auth/is-account-exist&username=${username}&token=${this._auth.getToken()}`;
    return <Observable<AccountExistResponse>>this._http.get(apiCheckAccount);
  }
}
