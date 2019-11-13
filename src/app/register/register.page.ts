import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AlertController, LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";
import { User } from "../helpers/user.model";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage {
  user: User = {
    username: "",
    email: "",
    password: ""
  };

  constructor(
    public router: Router,
    private authService: AuthService,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {}

  async registerUser() {
    const loading = await this.loadingController.create({
      message: "Registering ...",
      spinner: "bubbles"
    });

    await loading.present();

    this.authService.registerUser(this.user).subscribe(
      async response => {
        this.doUserLogin(response);
        await loading.dismiss();
      },
      async err => {
        this.presentAlert("Error", err.error);
        await loading.dismiss();
      }
    );
  }

  doUserLogin(response) {
    this.setItems(response);
    this.resetForm();
    this.router.navigate(["home"]);
  }

  setItems(response) {
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
    this.user.email = "";
    this.user.password = "";
  }

  ngOnDestroy(): void {
    this.resetForm();
  }
}
