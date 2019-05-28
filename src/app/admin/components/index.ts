import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from "./authentication/register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminDashboardComponents } from "./dashboard/components";
import { AdminBlogComponents } from "./blog";

export const DumpComponents = [LoginComponent, RegisterComponent, DashboardComponent, ...AdminDashboardComponents, ...AdminBlogComponents ];