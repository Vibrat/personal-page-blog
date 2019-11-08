import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges, Renderer2 } from "@angular/core";

export interface GroupInput {
  id: string;
  name: string;
  permission: string;
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
export class GroupListComponent implements OnChanges {

  @Input() groups: GroupInput[];
  @Input() permissions: string[];
  @Output() onDelete: EventEmitter<GroupInput> = new EventEmitter();
  @Output() onPermissionChange: EventEmitter<OnPermissionChange> = new EventEmitter();

  permissionState;
  permissionShow: boolean[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['groups'] && !changes['groups'].firstChange) {
      this.permissionShow = this.groups.map(_ => false);
    }
  }

  // Emit GroupInput[]
  deleteGroup(id: string) {
    const deletedGroup = this.groups.reduce((preItem, curItem) => curItem.id == id ? curItem : preItem);

    this.groups = this.groups.filter(item => item !== deletedGroup);
    this.onDelete.emit(deletedGroup);
  }

  showPermission(groupId: number) {
    const index = groupId - 1;
    if (!this.permissionShow[index]) {
      this.permissionShow[index] = false;
    }
    this.permissionShow[index] = !this.permissionShow[index];
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

  initPermissionState(groupId: number, index: number, permissions,  allPermissions, init = false) {
    if (!this.permissionState) this.permissionState = [];
    if (!this.permissionState[groupId]) this.permissionState[groupId] = [];
    if (!this.permissionState[groupId][index]) this.permissionState[groupId][index] = init;

    const isPermissionExist = permissions.hasOwnProperty('api') && permissions.api.indexOf(allPermissions[index]) !== -1;
    if (isPermissionExist) {
      this.permissionState[groupId][index] = true;
    }
  }

  // Parse json from string
  jsonParse(data: string, groupId: number) {

    let permissions;
    try {
      permissions = JSON.parse(data);
    } catch (e) {
      permissions = {};
    } finally {
      // Parse Permissions' API
      for (let i = 0; i < this.permissions.length; i++) {
        this.initPermissionState(groupId, i, permissions, this.permissions);
      }
      return this.permissions;
    }
  }
}
