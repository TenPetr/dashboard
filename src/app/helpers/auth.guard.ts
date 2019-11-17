import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router, public authService: AuthService) {}

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService
        .isLogged()
        .then(res => {
          if (!res) {
            this.router.navigate(["unauthorized"]);
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch(err => {
          this.router.navigate(["unauthorized"]);
          resolve(false);
        });
    });
  }
}
