import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { map, first } from "rxjs/operators";
import { GroupTagModel, CreateGroup, ListGroupResponse } from "../../models/group-tag.model";
import { AppConfig } from "~/app/_init/app-config.service";
import { GroupData } from "../../components/new-group/new-group.component";
import { MessageService } from "~/app/shared/services/message.service";
import { OnPermissionChange} from "../../components/group-list/group-list.component";


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

    // Event Key Hanlders
    permissionStates = [];

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

        // subscribe to change, and unsubribe since we will create new everytime
        this._group.createGroup(groupData)
        .pipe(first())
        .subscribe(
            response => {
                this.notify(response.success);
                this.groups$ = this.groups$.pipe(
                    map(groups => {
                        groups.data.push();
                        return groups;
                    })
                );
            },
            error    => console.error(`Error while create group - ${error}`)
        );
    }

    onGroupDelete(group: GroupData) {
        let params = {
            name: group.name
        }

        this._group.deleteGroup(params).subscribe(
            response => {
                this.notify(response.success);
            },
            error    => console.error(`Error while create group - ${error}`)
        );
    }

    onPermissionChange(state: OnPermissionChange) {
      this._group.updatePermission(state)
        .pipe(first())
        .subscribe(
          response =>  {
            this.notify(response.success);
          },
          error => {
            throw new Error(error)
          },
        );
    }

    notify(success: boolean) {
        this._msg[success ? 'success' : 'error'](success ? 'Done' : 'Failed');
    }

}
