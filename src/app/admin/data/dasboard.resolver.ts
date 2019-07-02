import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthService } from "../services/auth.service";
import { domain } from "../config";

export interface DashboardDataSnapshot {}

@Injectable()
export class DashboardResolverService
  implements Resolve<DashboardDataSnapshot> {
  data: Observable<DashboardDataSnapshot>;
  offset = 0;
  limit = 20;

  constructor(private _auth: AuthService, private _http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<DashboardDataSnapshot> {
    const apiListAccounts = `${domain}api=account/basic-auth/list&limit=${
      this.limit
    }&offset=${this.offset}&token=${this._auth.getToken()}`;
    return <Observable<DashboardDataSnapshot>>(
      this._http.get(apiListAccounts)
    );
  }
}
