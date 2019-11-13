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
  private readonly header = new HttpHeaders({ "No-Auth": "True" });

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

    return this.http.post(url, body, { headers: this.header });
  }

  loginUser(user: User) {
    const url = `${this.baseUrl}/auth`;

    const body = {
      username: user.username,
      password: user.password
    };

    return this.http.post(url, body, { headers: this.header });
  }

  getMe() {
    const url = `${this.baseUrl}/me`;

    return this.http.get(url);
  }

  getToken() {
    return localStorage.getItem("x-auth-token");
  }

  logoutUser() {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("x-refresh-token");
    localStorage.removeItem("username");
    this.router.navigate(["/login"]);
  }
}
