import { Component } from "@angular/core";
import { GroupTagModel, CreateGroup } from "../../models/group-tag.model";
import { AppConfig } from "~/app/_init/app-config.service";
import { GroupData } from "../../components/new-group/new-group.component";
import { MessageService } from "~/app/shared/services/message.service";

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

    constructor(private _group: GroupTagModel, private _msg: MessageService) {
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

    onGroupSubmit(data: GroupData) {
        
        // Re-format data
        let groupData: CreateGroup = {
            name: data.name,
            permission: {
                api: data.permissions
            }
        };
        
        this._group.createGroup(groupData).subscribe(
            response => this._msg[response.success ? 'success' : 'error'](response.success ? 'Done' : 'Failed'),
            error => console.error(`Error while create group - ${error}`)
        );
    }
    
}