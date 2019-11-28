import { Component } from "@angular/core";
import { DataService } from "../services/data.service";
import {
  NavController,
  LoadingController,
  AlertController
} from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage {
  email: string;
  username: string = "-";
  oldPassword: string;
  newPassword: string;
  correctPassword: boolean = true;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public dataService: DataService,
    public navCtrl: NavController,
    public router: Router
  ) {}

  ngOnInit() {
    this.getMe();
  }

  async getMe() {
    const loading = await this.loadingController.create({
      message: "Loading data ...",
      spinner: "bubbles"
    });

    await loading.present();

    this.dataService
      .getMe()
      .then(async res => {
        this.username = res.username;
        this.email = res.email;

        await loading.dismiss();
      })
      .catch(async () => {
        this.presentAlert("Error", "Network error");
        await loading.dismiss();
      });
  }

  async setNewPassword() {
    const loading = await this.loadingController.create({
      message: "Loading data ...",
      spinner: "bubbles"
    });

    await loading.present();

    if (!this.oldPassword || !this.newPassword) {
      this.presentAlert("Error", "Please fill both fields");
      return await loading.dismiss();
    }

    this.dataService
      .setNewPassword(this.oldPassword, this.newPassword)
      .then(async res => {
        if (!res) throw new Error();

        this.presentAlert("Info", res);
        this.newPassword = "";
        this.oldPassword = "";
        await loading.dismiss();
      })
      .catch(async err => {
        this.presentAlert("Error", "Network error");
        await loading.dismiss();
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

  navigateBack() {
    this.router.navigate(["/home"], { replaceUrl: true });
  }

  ngOnDestroy(): void {}
}
