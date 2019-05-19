import { Routes } from "@angular/router";

import { PageLoginComponent } from "./containers/page-login/page-login.component";

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            { 
                path: 'login',
                component: PageLoginComponent
            }
        ]
    },
];