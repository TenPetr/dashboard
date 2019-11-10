import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { map, mapTo, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  username: string;

  constructor(
    private http: HttpClient,
    public router: Router,
    public alertController: AlertController
  ) {}

  register(user) {
    const url = "http://localhost:3000/register";

    return this.http.post(url, user).pipe(
      tap(token => this.isUserLogin(user.username, token)),
      mapTo(true),
      catchError(err => {
        this.presentAlert("Error", err.error);
        return of(false);
      })
    );
  }

  login(user) {
    const url = "http://localhost:3000/auth";

    return this.http.post(url, user).pipe(
      tap(token => this.isUserLogin(user.username, token)),
      mapTo(true),
      catchError(err => {
        this.presentAlert("Error", err.error);
        return of(false);
      })
    );
  }

  isUserLogin(user, token) {
    this.username = user;
    localStorage.setItem("x-auth-token", token.token);
  }

  async presentAlert(title: string, text: string) {
    const alert = await this.alertController.create({
      header: title,
      message: text,
      buttons: ["OK"]
    });

    await alert.present();
  }

  logout() {
    this.username = null;
    localStorage.removeItem("x-auth-token");
    this.router.navigate(["/login"]);
  }
}
