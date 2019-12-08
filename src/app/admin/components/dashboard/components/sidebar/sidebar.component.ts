import { Component } from "@angular/core";
import { trigger, state, style } from "@angular/animations";
import { ActivatedRoute, Router } from "@angular/router";

export interface MenuData {
  enable: boolean;
  data: MenuItem[];
  options: MenuOptions;
}

export interface MenuItem {
  link: string;
  menu: string;
  icon?: string;
  children?: MenuItem[];
}

export interface MenuOptions {
  enableFileManager: boolean;
}

export type DefaultMenuData = MenuData | undefined;

export const defaultMenuData: DefaultMenuData = {
  enable: true,
  data: [],
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
  menus: MenuData = defaultMenuData;

  constructor(private route: ActivatedRoute, private router: Router) {
    const sidebar = this.route.snapshot.data.sidebar;
    this.menus = {
      ...defaultMenuData,
      data: sidebar.data
    };
  }

  navigate(url) {
    this.router.navigate([url]);
  }
}
