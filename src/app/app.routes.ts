import { Routes } from '@angular/router';

import { BlogComponent} from "./containers/items/blog.component";
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/blog',
      pathMatch: 'full',
  },
];
