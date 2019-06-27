import { Component } from "@angular/core";
import { Credentials } from "../../components/authentication/login/login.component";
import { AuthService, AuthResponse } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: `page-login`,
  templateUrl: `page-login.component.html`,
  styleUrls: ["page-login.component.scss"]
})
export class PageLoginComponent {
  constructor(protected _auth: AuthService, private _router: Router) {}

  login(credentials: Credentials) {
    this._auth
      .login(credentials.username, credentials.password)
      .subscribe((response: AuthResponse) => {
        if (response.success) {
          this._router.navigate(["admin", "dashboard"]);
        }
      });
  }
}
