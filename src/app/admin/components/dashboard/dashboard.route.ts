import { Routes } from "@angular/router";
import { AccountComponent } from "./containers/account/account.component";
import { GroupComponent } from "./containers/group/group.component";
import { SideBarComponent } from "./components/sidebar/sidebar.component";
import { SideBarResolver } from "./models/sidebar.model";

export const dashboardRoutes: Routes = [
    {
        path: '',
        redirectTo: 'account'
    },
    {
        path: 'account',
        resolve: {
            sidebar: SideBarResolver
        },
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
        resolve: {
            sidebar: SideBarResolver
        },
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
