import { Component } from "@angular/core";
import { Credentials } from "../../components/authentication/login/login.component";
import { AuthService, AuthResponse } from "../../services/auth.service";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap, switchMap, filter } from "rxjs/operators";

@Component({
  selector: `page-login`,
  templateUrl: `page-login.component.html`,
  styleUrls: ["page-login.component.scss"]
})
export class PageLoginComponent {
  public successLogin$: Observable<boolean> = of(true);
  constructor(
    protected _auth: AuthService, 
    private router: Router) {
  }

  // login
  login(credentials: Credentials) {
    this._auth
      .login(credentials.username, credentials.password)
      .pipe(
        switchMap((response: AuthResponse) => of(response.success)),
        tap(success => (this.successLogin$ = of(success))),
        filter(success => success)
      )
      .subscribe(_ => {
        this.router.navigate(["admin", "dashboard"]);
      });
  }
}
