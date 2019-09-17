import { Injectable } from "@angular/core";
import {
  GroupService,
  RemoveGroupFromUser,
  AddUserToGroupByName,
  ListGroupInput,
  IsGroupExist,
  DeleteGroup,
} from "../../../services/group.service";

import { map } from "rxjs/operators";

/**
 * Business API Layer - Group API
 */
@Injectable()
export class GroupTagModel {
  constructor(private _group: GroupService) {}

  public removeGroupFromUser(data: RemoveGroupFromUser) {
    return this._group.removeGroupFromUser(data);
  }

  public updateGroupByName(data: AddUserToGroupByName) {
    return this._group.updateGroupByName(data);
  }

  public listGroups(data: ListGroupInput) {
    return this._group.listGroups(data);
  }

  public checkGroupExist(data: IsGroupExist) {
    return this._group.isGroupExist(data);
  }

  public deleteGroup(data: DeleteGroup) {
    return this._group.deleteGroup(data);
  }

  public listAllPermissions() {
      return this._group.listAllGroupPermissions().pipe(
          map (response => (response.success ? response.data.api : []))
      );
  };
}
