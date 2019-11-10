import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage {
  email: string;
  username: string;
  password: string;

  constructor(
    public router: Router,
    private authService: AuthService,
    public alertController: AlertController
  ) {}

  registerUser() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe(response => {
      if (response) this.router.navigate(["/home"]);
    });
  }

  async presentAlert(title: string, text: string) {
    const alert = await this.alertController.create({
      header: title,
      message: text,
      buttons: ["OK"]
    });

    await alert.present();
  }

  ngOnDestroy(): void {}
}
