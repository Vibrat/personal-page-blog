import { GroupService, RemoveGroupFromUser, AddUserToGroupByName, ListGroupInput } from "../../../services/group.service";

export class GroupTagModel {
    private _service: GroupService;

    constructor(private _group: GroupService) {
        this._service = _group;
    }

    public removeGroupFromUser(data: RemoveGroupFromUser) {
        return this._group.removeGroupFromUser(data);
    }

    public updateGroupByName(data: AddUserToGroupByName) {
        return this._group.updateGroupByName(data);
    }

    public listGroups(data: ListGroupInput) {
        return this._group.listGroups(data);
    }
}