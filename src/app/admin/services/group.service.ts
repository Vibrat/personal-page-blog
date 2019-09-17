import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "~/app/_init/app-config.service";
import { AuthService } from "./auth.service";

import { Observable } from "rxjs";

export interface ListGroupInput {
  limit?: number;
  offset?: number;
  group?: string;
}

export interface AddUserToGroup {
  userId: string;
  groupId: string;
}

export interface AddUserToGroupByName {
  userId: string;
  groupname: string;
}

export interface AddUserToGroupResponse {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    groupname: string;
    groupId: string;
  };
}

export interface RemoveGroupFromUser {
  userId: number;
  groupname: string;
}

export interface RemoveGroupFromUserResponse {
  success: boolean;
  message?: string;
  code: number;
}

export interface IsGroupExist {
  group: string;
}

export interface IsGroupExistReponse {
  success: boolean;
  code?: number;
  total?: string;
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
    }&groupname=${data.group}&token=${this._token}`;

    return this._http.get(api);
  }

  /**
   * Add A User to Group Permissions
   *
   * @param data
   */
  public updateGroup(data: AddUserToGroup) {
    const api = `${AppConfig.get(
      "domain"
    )}api=account/group-permission/add-user-to-group&token=${this._token}`;
    const formData = new FormData();
    formData.append("userId", data["userId"]);
    formData.append("groupId", data["groupId"]);
    return <Observable<AddUserToGroupResponse>>this._http.post(api, formData);
  }

  /**
   * Add A User to Group Permissions
   *
   * @param data
   */
  public updateGroupByName(data: AddUserToGroupByName) {
    const api = `${AppConfig.get(
      "domain"
    )}api=account/group-permission/add-user-to-group-by-name&token=${
      this._token
    }`;
    const formData = new FormData();
    formData.append("userId", data["userId"]);
    formData.append("groupname", data["groupname"]);
    return <Observable<AddUserToGroupResponse>>this._http.post(api, formData);
  }

  /**
   * Remove a group from user
   * @param data
   *  - userId : number ID represents user
   *  - groupnames : string value represents group to be removed
   */
  public removeGroupFromUser(data: RemoveGroupFromUser) {
    let api = `${AppConfig.get(
      "domain"
    )}api=account/group-permission/remove-user-from-group-by-name`;
    api += `&userId=${data.userId}`;
    api += `&groupname=${data.groupname}`;
    api += `&token=${this._token}`;

    return <Observable<RemoveGroupFromUserResponse>>this._http.delete(api);
  }

  /**
   * Check if a group exist by name
   *
   * @param IsGroupExist data
   */
  public isGroupExist(data: IsGroupExist) {
    let api = `${AppConfig.get(
      "domain"
    )}api=account/group-permission/is-group-exist&group=${data.group}`;
    return <Observable<IsGroupExistReponse>>this._http.get(api);
  }
}
