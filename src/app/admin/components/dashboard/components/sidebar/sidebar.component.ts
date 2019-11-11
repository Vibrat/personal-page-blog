import { Component, Input } from '@angular/core';

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
      url: '/dashboard/group',
      text: 'Group',
      icon: 'team',
    }
  ],
  options: {
    enableFileManager: true
  }
};

@Component({
  selector: 'sidebar',
  templateUrl: `sidebar.component.html`,
  styleUrls: ['sidebar.component.scss']
})
export class SideBarComponent {
  isCollapsed = true;
  @Input() menus: MenuData = defaultMenuData;
}
