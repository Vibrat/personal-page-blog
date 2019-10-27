import { Component, Input, EventEmitter, Output } from "@angular/core";

export interface GroupInput {
  id: string;
  name: string;
  permission: {
    [name: string]: string;
  };
}

export interface OnPermissionChange {
  state: boolean;
  group: string;
  permission: string;
}

@Component({
  selector: 'dashboard-group-list',
  templateUrl: 'group-list.component.html',
  styleUrls: ['group-list.component.scss']
})
export class GroupListComponent {

  @Input() groups: GroupInput[];
  @Output() onDelete: EventEmitter<GroupInput> = new EventEmitter();
  @Output() onPermissionChange: EventEmitter<OnPermissionChange> = new EventEmitter();

  permissionState: boolean[];

  // Emit GroupInput[]
  deleteGroup(id: string) {
    const deletedGroup = this.groups.reduce((preItem, curItem) => curItem.id == id ? curItem : preItem);

    this.groups = this.groups.filter(item => item !== deletedGroup);
    this.onDelete.emit(deletedGroup);
  }

  changePermission(event: boolean, groupName: string, permission: string) {
    /**
     * @var boolean event
     *  - Return true mean select is active and vice versa
     */
    const state: OnPermissionChange = {
      state: event,
      group: groupName,
      permission: permission
    }
    this.onPermissionChange.emit(state);
  }

  initPermissionState(index: number) {
    if (!this.permissionState) this.permissionState = [];
    if (!this.permissionState[index]) this.permissionState[index] = true;
  }

  // Parse json from string
  jsonParse(data: string) {
    try {

      let permissions = JSON.parse(data);

      // Parse Permissions' API
      for (let i =0; i < permissions.api.length; i++) {
        this.initPermissionState(i);
      }

      return permissions;
    } catch (e) {
      return {};
    }
  }
}
