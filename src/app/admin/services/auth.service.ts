import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { domain } from "../config";

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface TokenValidatorResponse {
  success: boolean;
}

@Injectable()
export class AuthService {
  private _domain: string = domain;
  private _token: string | false;

  constructor(protected http: HttpClient) {
    // Reload token when refreshing page
    this._token = this.getToken();
  }
  /**
   * Login to retreive token
   *
   * @param string username
   * @param string password
   * @return Observable<AuthReponse>
   */
  login(username: string, password: string): Observable<AuthResponse> {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return <Observable<AuthResponse>>(
      this.http
        .post(`${this._domain}api=account/basic-auth/login`, formData)
        .pipe(
          tap((data: AuthResponse) => {
            sessionStorage.setItem("token", data["success"] ? data.token : "");
            this._token = this.getToken();
          })
        )
    );
  }

  /**
   * Check if token is valid
   *
   */
  checkToken(): Observable<boolean> {
    return <Observable<boolean>>(
      this.http.get(
        `${this._domain}api=account/basic-auth/token&token=${this._token}`
      ).pipe(map((response: TokenValidatorResponse) => response.success))
    );
  }

  getToken(): string {
    return sessionStorage.getItem("token");
  }

  logout() {
    sessionStorage.removeItem("token");
    this._token = false;
  }
}
