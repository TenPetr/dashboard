import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  private token = this.authService.getToken();

  constructor(public router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (!this.token) {
      this.router.navigate(["unauthorized"]);
      return false;
    }
    return true;
  }
}
