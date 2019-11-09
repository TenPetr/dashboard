import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { ValidateService } from "../services/validate.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage {
  username: string;
  password: string;

  constructor(
    public alertController: AlertController,
    public validateService: ValidateService
  ) {}

  async submitForm() {
    if (!this.validateService.validateName(this.username))
      return await this.presentAlert("Error", "Enter a valid username!");

    if (!this.validateService.validatePassword(this.password))
      return await this.presentAlert("Error", "Enter a valid password!");

    this.loginUser();
  }

  loginUser() {
    console.log(this.username, this.password);
  }

  async presentAlert(title: string, text: string) {
    const alert = await this.alertController.create({
      header: title,
      message: text,
      buttons: ["OK"]
    });

    await alert.present();
  }
}
