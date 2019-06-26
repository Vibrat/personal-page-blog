import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { domain } from "../config";

interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}

@Injectable()
export class AuthService {
  private _domain: string = domain;
  private _token: string;

  constructor(protected http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return <Observable<AuthResponse>>(
      this.http
        .post(`${this._domain}api=account/basic-auth/login`, formData)
        .pipe(
          tap((data: AuthResponse) => {
            sessionStorage.setItem("token", data["success"] ? data.token : '');
          })
        )
    );
  }
}
