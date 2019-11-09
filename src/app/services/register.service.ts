import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(
      "https://desolate-basin-07660.herokuapp.com/users/all"
    );
  }

  registerUser() {}
}
