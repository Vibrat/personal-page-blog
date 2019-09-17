import { Routes } from "@angular/router";
import { AccountComponent } from "./containers/account/account.component";
import { GroupComponent } from "./containers/group/group.component";

export const dashboardRoutes: Routes = [
    { 
        path: '',
        redirectTo: 'account'
    },
    {
        path: 'account',
        component: AccountComponent
    },
    {
        path: 'group',
        component: GroupComponent
    }
];