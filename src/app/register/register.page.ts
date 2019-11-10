import { Component } from "@angular/core";
import { RegisterService } from "../services/register.service";
import { AlertController } from "@ionic/angular";
import { ValidateService } from "../services/validate.service";

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
    private registerService: RegisterService,
    public alertController: AlertController,
    public validateService: ValidateService
  ) {}

  async submitForm() {
    if (!this.validateService.validateEmail(this.email))
      return await this.presentAlert("Error", "Enter a valid e-mail!");

    if (!this.validateService.validateName(this.username))
      return await this.presentAlert("Error", "Enter a valid username!");

    if (!this.validateService.validatePassword(this.password))
      return await this.presentAlert(
        "Error",
        "Enter a password longer than 8 characters!"
      );

    this.registerUser();
  }

  registerUser() {}

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
