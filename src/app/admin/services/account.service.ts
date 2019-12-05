import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";
import { AppConfig } from "~/app/_init/app-config.service";

export interface AccountsResponse {
  success: boolean;
  code: number;
  data: Account[];
  total: number;
  offset: number;
  limit: number;
}

export interface Account {
  id: number;
  username: string;
  groupname: object | null;
}

export interface NewAccount {
  username: string;
  password: string;
}

export interface NewAccountResponse {
  success: boolean;
  data: Account
}

export interface GetAccounts {
  offset: number;
  limit: number;
  group: string;
  name: string;
}

export interface AccountDeleteResponse {
  success: boolean;
  message: string;
}

export interface AccountExistResponse {
  success: boolean;
  message?: string;
}

export interface ChangePassword {
  username: string;
  'new-password': string;
}

export interface ChangPasswordReponse {
  success: boolean;
  code?: number;
  message: string;
}

@Injectable()
export class AccountService {
  data: Observable<AccountsResponse>;

  constructor(private _auth: AuthService, private _http: HttpClient) {}

  public getAccounts(offset = 0, limit = 20, group = '', name = ''): Observable<AccountsResponse> {
    const apiListAccounts = `${AppConfig.get(
      "domain"
    )}api=account/basic-auth/list&limit=${limit}&offset=${offset}&token=${this._auth.getToken()}&name=${name}&group=${group}`;
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

  /**
   * Change password by admin
   *
   * @param ChangePassword data
   */
  public changePassword(data: ChangePassword): Observable<ChangPasswordReponse> {

    const api = `${AppConfig.get('domain')}api=account/basic-auth/change-password-by-admin&token=${this._auth.getToken()}`;
    const payload = new FormData();
    payload.append('username', data.username);
    payload.append('new-password', data["new-password"]);

    return <Observable<ChangPasswordReponse>>this._http.put(api, payload);
  }
}
