import { Component, Input, EventEmitter, Output, AfterContentInit } from "@angular/core";
import { tap } from "rxjs/operators";

export interface GroupInput {
  id: string;
  name: string;
  permission: {
    [name: string]: string;
  };
}

@Component({
  selector: "dashboard-group-list",
  templateUrl: "group-list.component.html"
})
export class GroupListComponent {

  @Input() groups: GroupInput[];
  @Output() onDelete: EventEmitter<GroupInput> = new EventEmitter();

  // Emit GroupInput[]
  deleteGroup(id) {
    const deletedGroup = this.groups.reduce((preItem, curItem) => curItem.id == id ? curItem : preItem);

    this.groups = this.groups.filter(item => item !== deletedGroup);
    this.onDelete.emit(deletedGroup);
  }

  onPermissionClick(event) {
    console.log('on permission click, event');
  }

  // Parse json from string
  jsonParse(data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return {};
    }
  }
}
