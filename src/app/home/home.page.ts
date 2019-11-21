import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(
    public authService: AuthService,
    public router: Router,
    public loadingController: LoadingController
  ) {}

  test() {
    this.authService.getMe().subscribe(res => {
      console.log(res);
    });
  }

  async logoutUser() {
    const loading = await this.loadingController.create({
      message: "Logging out ...",
      spinner: "bubbles"
    });

    await loading.present();

    this.authService.logout().subscribe(
      async res => {
        this.router.navigate(["login"]);
        await loading.dismiss();
      },
      async err => {
        this.router.navigate(["login"]);
        await loading.dismiss();
        return throwError(err);
      }
    );
  }
}
