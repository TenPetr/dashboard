import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage {
  username: string;
  password: string;

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public authService: AuthService,
    public router: Router
  ) {}

  async loginUser() {
    const loading = await this.loadingController.create({
      message: "Logging in...",
      spinner: "bubbles"
    });
    await loading.present();

    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.login(user).subscribe(async response => {
      if (response === true) {
        this.username = "";
        this.password = "";
        this.router.navigate(["/home"]);
      }
      await loading.dismiss();
    });
  }

  async presentAlert(title: string, text: any) {
    const alert = await this.alertController.create({
      header: title,
      message: text,
      buttons: ["OK"]
    });

    await alert.present();
  }
}
