import { Routes } from "@angular/router";
import { AdminBlogComponent } from "./containers/page-blog/admin-blog.component";
import { NewBlogActionComponent } from "./containers/new-blog/new-blog.action.component";
import { SideBarComponent } from "./components/sidebar/sidebar.component";
import { SideBarResolver } from "./models/sidebar.model";

export const AdminBlogRoutes: Routes = [
  {
    path: "",
    resolve: {
      sidebar: SideBarResolver
    },
    children: [
      {
        path: "",
        component: AdminBlogComponent
      },
      {
        path: "",
        component: SideBarComponent,
        outlet: "admin-menu"
      }
    ]
  },
  {
    path: "new",
    resolve: {
      sidebar: SideBarResolver
    },
    children: [
      {
        path: "",
        component: NewBlogActionComponent
      },
      {
        path: "",
        component: SideBarComponent,
        outlet: "admin-menu"
      }
    ]
  }
];
