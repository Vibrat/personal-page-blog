import { Component } from "@angular/core";
import { GroupTagModel, CreateGroup, ListGroupResponse } from "../../models/group-tag.model";
import { AppConfig } from "~/app/_init/app-config.service";
import { GroupData } from "../../components/new-group/new-group.component";
import { MessageService } from "~/app/shared/services/message.service";
import { Observable, of } from "rxjs";

@Component({
    selector: 'dashboard-group',
    templateUrl: 'group.component.html',
    styleUrls: ['group.component.scss']
})
export class GroupComponent {

    /** @var groupPermissions$ data return from api list-all-permissions */
    groupPermissions$;
    groups$: Observable<ListGroupResponse>;
    userDelayDetection = AppConfig.get('userDelayDetection');

    constructor(private _group: GroupTagModel, private _msg: MessageService) {
        this.groupPermissions$ = this._group.listAllPermissions();
        this.groups$ = this._group.listGroups();
    }

    checkGroupExist() {
        return (input: string) => this._group.checkGroupExist({ group: input });
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
