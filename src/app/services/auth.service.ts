import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { User } from "../helpers/user.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly baseUrl = "http://localhost:3000";
  private readonly username = localStorage.getItem("username");
  private readonly contentType = { "Content-Type": "application/json" };
  private readonly noAuth = { "No-Auth": "True" };

  private readonly header = new HttpHeaders(this.contentType);
  private readonly noAuthHeader = new HttpHeaders({
    ...this.contentType,
    ...this.noAuth
  });

  private readonly options = { headers: this.header, withCredentials: true };
  private readonly noAuthOptions = {
    headers: this.noAuthHeader,
    withCredentials: true
  };

  public logReg: boolean = false;

  constructor(
    public router: Router,
    private http: HttpClient,
    public alertController: AlertController
  ) {}

  registerUser(u: User): Observable<any> {
    const url = `${this.baseUrl}/register`;
    const body = { username: u.username, email: u.email, password: u.password };

    return this.http.post(url, body, this.noAuthOptions);
  }

  loginUser(u: User): Observable<any> {
    const url = `${this.baseUrl}/auth`;
    const body = { username: u.username, password: u.password };

    // When you want to send a cookies with requests,
    // you have to put "withCredentials: true" into request option
    return this.http.post(url, body, this.noAuthOptions);
  }

  getMe(): Observable<any> {
    const url = `${this.baseUrl}/me`;

    return this.http.get(url, this.options);
  }

  refreshToken(): Observable<any> {
    const url = `${this.baseUrl}/token`;

    return this.http.get(url, this.options);
  }

  logout(): Observable<any> {
    const url = `${this.baseUrl}/auth/logout`;
    const body = { username: this.username };

    localStorage.removeItem("username");

    return this.http.post(url, body, this.noAuthOptions);
  }

  isLogged(): Promise<any> {
    const url = `${this.baseUrl}/auth/islogged`;

    return this.http.get(url, this.noAuthOptions).toPromise();
  }
}
