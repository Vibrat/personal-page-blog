import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";

@Injectable()
export class SideBarResolver implements Resolve<any> {
  constructor() {}
  resolve() {
    return {
      menu: [
        {
          url: "/admin/dashboard/account",
          text: "Group",
          icon: "team",
          data: [
            {
              url: "/admin/dashboard/group",
              text: "Group 2",
              icon: "team"
            },
            {
              url: "/admin/dashboard/group",
              text: "Group 2",
              icon: "team"
            }
          ]
        }
      ]
    };
  }
}
