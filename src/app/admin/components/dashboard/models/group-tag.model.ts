import { Injectable } from "@angular/core";
import { GroupService, RemoveGroupFromUser, AddUserToGroupByName, ListGroupInput, IsGroupExist } from "../../../services/group.service";

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
}