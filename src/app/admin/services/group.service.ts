import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "~/app/app-config.service";
import { AuthService } from "./auth.service";

export interface ListGroupInput {
    limit?: number;
    offset?: number;
    groupname?: string;
}

@Injectable()
export class GroupService {
  private _domain: string = AppConfig.get("domain");
  private _token: string | false;

  constructor(private _http: HttpClient, private _auth: AuthService) {
    this._token = this._auth.getToken();
  }

  /**
   * List group based on value input
   *
   * @param name (Optional)
   */
  public listGroups(data: ListGroupInput) {
    const api = `${AppConfig.get(
      "domain"
    )}api=account/group-permission/list-groups&limit=${data.limit}&offset=${
      data.offset
    }&groupname=${data.groupname}&token=${this._token}`;

    return this._http.get(api);
  }
}
