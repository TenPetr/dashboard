import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (!this.authService.getToken()) {
      this.router.navigate(["unauthorized"]);
      return false;
    }
    return true;
  }
}
