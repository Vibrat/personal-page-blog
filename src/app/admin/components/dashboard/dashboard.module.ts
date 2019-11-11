import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AdminDashboardComponents } from "./components";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { SharedPipesModule } from "~/app/shared/pipes/shared-pipes.module";
import { dashboardRoutes } from "./dashboard.route";
import { AccountComponent } from "./containers/account/account.component";
import { GroupComponent } from "./containers/group/group.component";
import { AccountModel } from "./models/account.model";
import { GroupTagModel } from "./models/group-tag.model";
import { SideBarResolver } from "./models/sidebar.model";

@NgModule({
  imports: [
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedPipesModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  declarations: [AccountComponent, GroupComponent, AdminDashboardComponents],
  exports: [AccountComponent, GroupComponent],
  providers: [AccountModel, GroupTagModel, SideBarResolver]
})
export class DashboardModule {}
