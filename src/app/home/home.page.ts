import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(public authService: AuthService, public router: Router) {
    this.authService.getMe().subscribe(
      response => {
        console.log(response);
      },
      err => {
        console.log(err);
      }
    );
  }

  logoutUser() {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("x-refresh-token");
    localStorage.removeItem("username");
    this.router.navigate(["/login"]);
  }
}
