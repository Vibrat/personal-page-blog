import { Routes } from '@angular/router';
import { AdminCanLoadService } from "./admin-canload.service";

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/blog',
        pathMatch: 'full',
      },
      { 
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canLoad: [AdminCanLoadService]
      }
    ]
  }
 
];
