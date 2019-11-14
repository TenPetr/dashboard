import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(public authService: AuthService, public router: Router) {}

  test() {
    this.authService.getMe().subscribe(res => {
      console.log(res);
    });
  }

  logoutUser() {
    this.authService.logout().subscribe(
      res => {
        this.authService.doLogoutUser();
      },
      err => {
        return throwError(err);
      }
    );
  }
}
