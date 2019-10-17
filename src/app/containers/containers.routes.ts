import { Routes } from "@angular/router";

import { GridCardComponent } from "./items/card.grid.component";
import { CanActivateCard } from "./card.guard.service";
import { ResolverCard } from "./card.resolve.service";

import { BlogComponent } from "./items/blog.component";
import { CanActivateBlog } from "./blog.guard.service";

export const routes: Routes = [
    {
        path: 'blog',
        children: [
            {
                path: '',
                component: GridCardComponent,
                canActivate: [CanActivateCard],
                resolve: {
                    cards: ResolverCard,
                }
            },
            {
                path: ':id',
                component: BlogComponent,
                canActivate: [CanActivateBlog]
            }
        ]
    }
]
