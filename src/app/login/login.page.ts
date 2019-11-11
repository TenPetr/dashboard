import { Component } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { User } from "../helpers/user.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage {
  user: User = {
    username: undefined,
    password: undefined
  };

  token: string;
  refreshToken: string;
  username: string;

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public authService: AuthService,
    public router: Router
  ) {}

  async loginUser() {
    const loading = await this.loadingController.create({
      message: "Logging ...",
      spinner: "bubbles"
    });
    await loading.present();

    this.authService.loginUser(this.user).subscribe(
      response => {
        this.setLocalStorage(response);
        this.resetForm();
        this.router.navigate(["home"]);
      },
      err => {
        this.presentAlert("Error", err.error);
      }
    );

    await loading.dismiss();
  }

  setLocalStorage(response) {
    localStorage.setItem("x-auth-token", response["token"]);
    localStorage.setItem("x-refresh-token", response["refreshToken"]);
    localStorage.setItem("username", response["username"]);
  }

  async presentAlert(title: string, text: string) {
    const alert = await this.alertController.create({
      header: title,
      message: text,
      buttons: ["OK"]
    });

    await alert.present();
  }

  resetForm(): void {
    this.user.username = "";
    this.user.password = "";
  }

  ngOnDestroy(): void {
    this.resetForm();
  }
}
