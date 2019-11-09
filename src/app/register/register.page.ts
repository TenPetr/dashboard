import { Component } from "@angular/core";
import { RegisterService } from "../services/register.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage {
  email: string;
  username: string;
  password: string;
  re_password: string;

  constructor(private registerService: RegisterService) {}

  register() {}
}
