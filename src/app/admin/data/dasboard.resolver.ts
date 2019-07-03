import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

import { AccountService, AccountsResponse } from "../services/account.service";

@Injectable()
export class DashboardResolverService
  implements Resolve<AccountsResponse> {

  constructor(private _account: AccountService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AccountsResponse> {
    return this._account.getAccounts();
  }
}
