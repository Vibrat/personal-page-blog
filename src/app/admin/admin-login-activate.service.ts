import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Injectable()
export class AdminLoginActivateService implements CanActivate {
  constructor(private _auth: AuthService, protected router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      console.log ("ActivatedRouteSnapshot", route);
      console.log ("RouterStateSnapshot", state);

      return this.preCheckToken();
  }

  // check if token is valid so nativagate
  preCheckToken(): Observable<boolean> {
    return this._auth.checkToken().pipe(map((success: boolean) => {
      if (success) {
        this.router.navigate(['admin', 'dashboard']);
      }
      return !success;
    }))
  }
}
