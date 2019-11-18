import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { User } from "../helpers/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly baseUrl = "http://localhost:3000";
  private readonly header = new HttpHeaders({
    "Content-Type": "application/json"
  });
  private readonly options = { headers: this.header, withCredentials: true };

  private readonly header2 = new HttpHeaders({
    "Content-Type": "application/json",
    "No-Auth": "True"
  });
  private readonly options2 = { headers: this.header2, withCredentials: true };

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

    return this.http.post(url, body, this.options2);
  }

  loginUser(user: User) {
    const url = `${this.baseUrl}/auth`;

    const body = {
      username: user.username,
      password: user.password
    };

    // When you want to send a cookies with requests, you have to put "withCredentials: true" into request option
    return this.http.post(url, body, this.options2);
  }

  getMe() {
    const url = `${this.baseUrl}/me`;
    return this.http.get(url, this.options);
  }

  refreshToken() {
    const url = `${this.baseUrl}/auth/token`;
    return this.http.get(url, this.options);
  }

  logout() {
    const url = `${this.baseUrl}/auth/logout`;

    const body = {
      username: localStorage.getItem("username")
    };

    return this.http.post(url, body, this.options2);
  }

  isLogged() {
    const url = `${this.baseUrl}/auth/islogged`;
    return this.http.get(url, this.options2).toPromise();
  }
}
