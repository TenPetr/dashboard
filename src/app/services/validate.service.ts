import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ValidateService {
  constructor() {}

  validateEmail(email: string) {
    if (email && email.length >= 1 && email.includes("@")) return true;
    return false;
  }

  validateName(username: string) {
    if (username && username.length >= 1) return true;
    return false;
  }

  validatePassword(password: string) {
    if (password && password.length >= 8) return true;
    return false;
  }
}
