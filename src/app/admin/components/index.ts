import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from "./authentication/register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminDashboardComponents } from "./dashboard/components";
import { AdminBlogComponent } from "./blog/admin-blog.component";

export const DumpComponents = [LoginComponent, RegisterComponent, DashboardComponent, ...AdminDashboardComponents, AdminBlogComponent ];