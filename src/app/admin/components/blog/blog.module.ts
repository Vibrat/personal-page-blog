import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { SharedPipesModule } from "~/app/shared/pipes/shared-pipes.module";

import { AdminBlogContainers } from "./containers";
import { AdminBlogComponents } from "./components";
import { SideBarResolver } from "./models/sidebar.model";
import { AdminBlogRoutes } from "./blog.route";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    SharedPipesModule,
    RouterModule.forChild(AdminBlogRoutes)
  ],
  declarations: [...AdminBlogContainers, ...AdminBlogComponents],
  providers: [SideBarResolver]
})
export class AdminBlogModule {}
