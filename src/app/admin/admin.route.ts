import { Routes } from "@angular/router";

import { PageLoginComponent } from "./containers/page-login/page-login.component";
import { PageRegisterComponent } from "./containers/page-register/page-register.component";
import { PageDashBoardComponent } from "./containers/page-dashboard/page-dashboard.component";
import { PageBlogComponent } from "./containers/page-blog/page-blog.component";
import { PageNewBlogComponent } from "./containers/page-new-blog/page-new-blog.component";
 
import { AdminActivateService } from "./admin-activate.service";
import { AdminLoginActivateService } from "./admin-login-activate.service";

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
                component: PageDashBoardComponent
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