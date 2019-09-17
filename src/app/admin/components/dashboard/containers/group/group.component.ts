import { Component } from "@angular/core";
import { GroupTagModel } from "../../models/group-tag.model";
import { AppConfig } from "~/app/_init/app-config.service";

@Component({
    selector: 'dashboard-group',
    templateUrl: 'group.component.html',
    styleUrls: ['group.component.scss']
})
export class GroupComponent {   

    /** @var groupPermissions$ data return from api list-all-permissions */
    groupPermissions$;
    groupData = [];
    userDelayDetection = AppConfig.get('userDelayDetection');

    constructor(private _group: GroupTagModel) {
        this.groupPermissions$ = this._group.listAllPermissions();
    }

    checkGroupExist() {
        return (input: string) => this._group.checkGroupExist({ group: input });
    }

    deleteGroup(id) {
        console.log('a group is deleted');
    }

    newGroup(event) {
        console.log('on creating new group');
    }

    onGroupSubmit(data) {
        console.log(data);
    }
    
}