import { Routes } from "@angular/router";

import { PageLoginComponent } from "./containers/page-login/page-login.component";
import { PageRegisterComponent } from "./containers/page-register/page-register.component";
import { PageDashBoardComponent } from "./containers/page-dashboard/page-dashboard.component";
import { PageBlogComponent } from "./containers/page-blog/page-blog.component";

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
            },
            { 
                path: 'register',
                component: PageRegisterComponent
            },
            {
                path: 'dashboard',
                component: PageDashBoardComponent
            },
            {
                path: 'blog',
                component: PageBlogComponent 
            }
        ]
    },
];