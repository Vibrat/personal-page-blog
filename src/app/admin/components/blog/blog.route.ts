import { Routes } from "@angular/router";
import { AdminBlogComponent } from "./containers/page-blog/admin-blog.component";
import { SideBarComponent } from "./components/sidebar/sidebar.component";
import { SideBarResolver } from "./models/sidebar.model";
import { PageNewComponent } from "./containers/page-new/page-new.component";

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
        component: PageNewComponent
      },
      {
        path: "",
        component: SideBarComponent,
        outlet: "admin-menu"
      }
    ]
  }
];
