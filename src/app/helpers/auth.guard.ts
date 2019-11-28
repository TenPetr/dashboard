import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router, public authService: AuthService) {}

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      if (!this.authService.logReg) {
        this.authService
          .isLogged()
          .then(res => {
            if (!res) {
              this.authService.logReg = false;
              this.router.navigate(["unauthorized"]);
              resolve(false);
            } else {
              this.authService.logReg = false;
              resolve(true);
            }
          })
          .catch(() => {
            this.authService.logReg = false;
            this.router.navigate(["unauthorized"]);
            resolve(false);
          });
      } else {
        this.authService.logReg = false;
        resolve(true);
      }
    });
  }
}
