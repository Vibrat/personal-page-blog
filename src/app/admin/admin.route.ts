import { Routes } from "@angular/router";

import { PageLoginComponent } from "./containers/page-login/page-login.component";
import { PageRegisterComponent } from "./containers/page-register/page-register.component";
import { PageBlogComponent } from "./containers/page-blog/page-blog.component";
import { PageNewBlogComponent } from "./containers/page-new-blog/page-new-blog.component";
 
import { AdminActivateService } from "./admin-activate.service";
import { AdminLoginActivateService } from "./admin-login-activate.service";

import { DashboardResolverService } from "./data/dasboard.resolver";

export const routes: Routes = [
    { 
        path: 'login',
        component: PageLoginComponent,
        canActivate: [AdminLoginActivateService]
    },
    {
        path: '',
        canActivate: [ AdminActivateService ],
        children: [
            { 
                path: 'register',
                component: PageRegisterComponent
            },
            {
                path: 'dashboard',
                loadChildren: './components/dashboard/dashboard.module#DashboardModule',
                resolve: {
                    dashboard: DashboardResolverService
                }
            },
            {
                path: 'blog',
                component: PageBlogComponent 
            },
            {
                path: 'new-blog',
                component: PageNewBlogComponent
            }
        ]
    },
];