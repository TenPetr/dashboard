import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { User } from "../helpers/user.model";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly baseUrl = "http://localhost:3000";

  constructor(
    public router: Router,
    private http: HttpClient,
    public alertController: AlertController
  ) {}

  registerUser(user: User) {
    const url = `${this.baseUrl}/register`;

    const body = {
      username: user.username,
      email: user.email,
      password: user.password
    };

    return this.http.post(url, body);
  }

  loginUser(user: User) {
    const url = `${this.baseUrl}/auth`;

    const body = {
      username: user.username,
      password: user.password
    };

    return this.http.post(url, body);
  }

  getMe() {
    const url = `${this.baseUrl}/me`;

    return this.http.get(url);
  }

  refreshToken() {
    const url = `${this.baseUrl}/auth/token`;

    const body = {
      username: localStorage.getItem("username"),
      refreshToken: localStorage.getItem("x-refresh-token")
    };

    return this.http.post(url, body).pipe(
      tap(tokens => {
        this.storeTokens(tokens);
      })
    );
  }

  logout() {
    const url = `${this.baseUrl}/auth/logout`;

    const body = {
      username: localStorage.getItem("username")
    };

    return this.http.post(url, body);
  }

  getToken() {
    return localStorage.getItem("x-auth-token");
  }

  doLogoutUser() {
    this.removeData();
    this.router.navigate(["login"]);
  }

  storeTokens(tokens) {
    localStorage.setItem("x-auth-token", tokens["token"]);
    localStorage.setItem("x-refresh-token", tokens["refreshToken"]);
  }

  doUserLogin(response) {
    localStorage.setItem("x-auth-token", response["token"]);
    localStorage.setItem("x-refresh-token", response["refreshToken"]);
    localStorage.setItem("username", response["username"]);
    this.router.navigate(["home"]);
  }

  removeData() {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("x-refresh-token");
    localStorage.removeItem("username");
  }
}
