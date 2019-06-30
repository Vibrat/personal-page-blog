import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Router
} from "@angular/router";
import { AuthService } from "./services";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class AdminActivateService implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    url: RouterStateSnapshot
  ): Observable<boolean> {
    return this._auth.checkToken().pipe(tap(is_logged =>  {
      if (!is_logged) {
        this._router.navigate(['admin', 'login']);
      }  
    }));
  }
}
