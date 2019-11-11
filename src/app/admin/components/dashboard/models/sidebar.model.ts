import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";

@Injectable()
export class SideBarResolver implements Resolve<any> {
  constructor() {}

  resolve() {
    return {
      menu:  [
        {
        url: '/dashboard/group',
        text: 'Group',
        icon: 'team',
        data: [
          {
            url: '/dashboard/group',
            text: 'Group 2',
            icon: 'team'
          },
          {
            url: '/dashboard/group',
            text: 'Group 2',
            icon: 'team'
          }
        ]
        }
    ],
    };
  }
}
