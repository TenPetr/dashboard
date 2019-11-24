import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DateTimeService {
  constructor() {}

  getDate(): string {
    const date = new Date();
    const day = date.getDate();

    return day < 10 ? "0" + String(day) : String(day);
  }

  getMonth(): string {
    const date = new Date();
    let month = date.getMonth() + 1;

    return month < 10 ? "0" + String(month) : String(month);
  }
}
