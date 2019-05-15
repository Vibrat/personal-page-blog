import { Injectable } from "@angular/core";
import { CanActivate, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class ResolverCard implements Resolve<any> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return [{
            id: 'blog-content-abds',
            title: 'New Blog has just arrived',
            description: ' New Era of Angular developers'
        },
        {
            id: 'blog-content-abds23',
            title: 'New Blog has just arrived',
            description: ' New Era of Angular developers'
        }];
    }
}