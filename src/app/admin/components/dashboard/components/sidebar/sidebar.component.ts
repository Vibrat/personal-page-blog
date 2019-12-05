import { Component, Input } from "@angular/core";
import { trigger, state, style } from "@angular/animations";
import { ActivatedRoute, Router } from "@angular/router";

export interface MenuData {
  enable: boolean;
  data: MenuItem[];
  options: MenuOptions;
}

export interface MenuItem {
  url: string;
  text: string;
  icon?: string;
  data?: MenuItem[];
}

export interface MenuOptions {
  enableFileManager: boolean;
}

export type DefaultMenuData = MenuData | undefined;

export const defaultMenuData: DefaultMenuData = {
  enable: true,
  data: [
    {
      url: "/dashboard/group",
      text: "Group",
      icon: "team",
      data: [
        {
          url: "/dashboard/group",
          text: "Group 2",
          icon: "team"
        },
        {
          url: "/dashboard/group",
          text: "Group 2",
          icon: "team"
        }
      ]
    }
  ],
  options: {
    enableFileManager: true
  }
};

@Component({
  selector: "sidebar",
  templateUrl: `sidebar.component.html`,
  styleUrls: ["sidebar.component.scss"],
  animations: [
    trigger("menuWidth", [
      state(
        "small",
        style({
          width: "80px",
          "text-align": "center"
        })
      ),
      state(
        "medium",
        style({
          width: "200px"
        })
      )
    ])
  ]
})
export class SideBarComponent {
  isCollapsed = true;
  @Input() menus: MenuData = defaultMenuData;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.menus.data = this.route.snapshot.data.sidebar.menu;
  }

  navigate(url) {
    this.router.navigate([url]);
  }
}
