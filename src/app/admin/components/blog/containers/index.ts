import { NewBlogActionComponent } from "./new-blog/new-blog.action.component";
import { DeleteAllButton } from "./delete-all/delete-all.component";
import { DeactivateButton } from "./deactivate/deactivate.component";
import { ActivateButton } from "./activate/activate.component";
import { AdminBlogComponent } from "./page-blog/admin-blog.component";

export const AdminBlogContainers = [NewBlogActionComponent, AdminBlogComponent, DeleteAllButton, DeactivateButton, ActivateButton];
