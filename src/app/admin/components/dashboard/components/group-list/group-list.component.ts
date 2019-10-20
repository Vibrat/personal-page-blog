import { Component, Input, OnInit } from "@angular/core";

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

  @Input() groups: GroupInput;

  jsonParse(data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return {};
    }
  }

  deleteGroup() {

  }
}
