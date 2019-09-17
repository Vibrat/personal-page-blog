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

export interface DeleteGroup {
  name: string;
}

export interface DeleteGroupResponse {
  success: boolean;
  message: string;
}

export interface ListAllPermissionsResponse {
  success: boolean;
  data:  {
    api: string[];
  };
}

@Injectable()
export class GroupService {
  private _token: string | false;

  constructor(private _http: HttpClient, private _auth: AuthService) {
    this._token = this._auth.getToken();
  }

  public listGroups(data: ListGroupInput) {
    const api = `${AppConfig.get(
      "domain"
    )}api=account/group-permission/list-groups&limit=${data.limit}&offset=${
      data.offset
    }&groupname=${data.group}&token=${this._token}`;

    return this._http.get(api);
  }

  public updateGroup(data: AddUserToGroup) {
    const api = `${AppConfig.get(
      "domain"
    )}api=account/group-permission/add-user-to-group&token=${this._token}`;
    const formData = new FormData();
    formData.append("userId", data["userId"]);
    formData.append("groupId", data["groupId"]);
    return <Observable<AddUserToGroupResponse>>this._http.post(api, formData);
  }

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

  public deleteGroup(data: DeleteGroup) {
    const api = `${AppConfig.get(
      "domain"
    )}api=account/group-permission/delete&name=${data.name}`;
    return <Observable<DeleteGroupResponse>>this._http.delete(api);
  }

  public removeGroupFromUser(data: RemoveGroupFromUser) {
    let api = `${AppConfig.get(
      "domain"
    )}api=account/group-permission/remove-user-from-group-by-name`;
    api += `&userId=${data.userId}`;
    api += `&groupname=${data.groupname}`;
    api += `&token=${this._token}`;

    return <Observable<RemoveGroupFromUserResponse>>this._http.delete(api);
  }

  public isGroupExist(data: IsGroupExist) {
    let api = `${AppConfig.get(
      "domain"
    )}api=account/group-permission/is-group-exist&group=${data.group}&token=${this._token}`;
    return <Observable<IsGroupExistReponse>>this._http.get(api);
  }

  public listAllGroupPermissions() {
    const api = `${AppConfig.get('domain')}api=account/group-permission/list-all-permissions&token=${this._token}`;
    return <Observable<ListAllPermissionsResponse>>this._http.get(api);
  }
}
