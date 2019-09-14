import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from "./authentication/register/register.component";
import { AdminBlogComponents } from "./blog";

export const DumpComponents = [LoginComponent, RegisterComponent, ...AdminBlogComponents ];