import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";
import { AppConfig } from "~/app/_init/app-config.service";

export interface GetNavigationByTokenResponse {
  success: boolean;
  code: number;
  data: Navigation[];
  raw: Navigation[];
}

export interface Navigation {
  id: string | number;
  menu: string;
  icon: string;
  link: string;
  children: Navigation[] | "" | [];
}

@Injectable()
export class NavigationService {
  private _token: string;
  private _domain: string;

  constructor(private _http: HttpClient, private _auth: AuthService) {
    this._token = this._auth.getToken();
    this._domain = AppConfig.get("domain");
  }

  public getNavigationByToken(): Observable<GetNavigationByTokenResponse> {
    return <Observable<GetNavigationByTokenResponse>>(
      this._http.get(
        `${this._domain}api=navigation/menu/read&token=${this._token}`
      )
    );
  }
}
