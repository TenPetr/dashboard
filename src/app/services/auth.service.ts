import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { map, mapTo, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { User } from "../helpers/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private http: HttpClient,
    public router: Router,
    public alertController: AlertController
  ) {}

  registerUser(user: User) {
    const url = "http://localhost:3000/register";
    const header = new HttpHeaders({ "No-Auth": "True" });

    const body = {
      username: user.username,
      email: user.email,
      password: user.password
    };

    return this.http.post(url, body, { headers: header });
  }

  loginUser(user: User) {
    const url = "http://localhost:3000/auth";
    const header = new HttpHeaders({ "No-Auth": "True" });

    const body = {
      username: user.username,
      password: user.password
    };

    return this.http.post(url, body, { headers: header });
  }

  getMe() {
    const url = "http://localhost:3000/me";
    const token = localStorage.getItem("x-auth-token");

    return this.http.get(url);
  }

  getToken() {
    return localStorage.getItem("x-auth-token");
  }
}
