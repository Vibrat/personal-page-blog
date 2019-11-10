import { Routes } from "@angular/router";
import { AccountComponent } from "./containers/account/account.component";
import { GroupComponent } from "./containers/group/group.component";
import { SideBarComponent } from "./components/sidebar/sidebar.component";

export const dashboardRoutes: Routes = [
    {
        path: '',
        redirectTo: 'account'
    },
    {
        path: 'account',
        children: [
            {
                path: '',
                component: AccountComponent
            },
            {
                path: '',
                component: SideBarComponent,
                outlet: 'admin-menu'
            }
        ]
    },
    {
        path: 'group',
        children: [
            {
                path: '',
                component: GroupComponent
            },
            {
                path: '',
                component: SideBarComponent,
                outlet: 'admin-menu'
            }
        ]
    },
];
