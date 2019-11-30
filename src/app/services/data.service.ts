import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private readonly baseUrl = "https://dshboard-b.herokuapp.com/";

  // Headers
  private readonly contentType = { "Content-Type": "application/json" };

  private readonly header = new HttpHeaders(this.contentType);

  private readonly options = { headers: this.header, withCredentials: true };

  constructor(private http: HttpClient) {}

  getWeather(lat: any, lon: any): Promise<any> {
    const url = `${this.baseUrl}/weather`;
    const params = new HttpParams().set("lat", lat).set("lon", lon);

    return this.http.get(url, { params: params, ...this.options }).toPromise();
  }

  getCalendar(): Promise<any> {
    const url = `${this.baseUrl}/calendar`;

    return this.http.get(url, this.options).toPromise();
  }

  getNews(): Promise<any> {
    const url = `${this.baseUrl}/news`;

    return this.http.get(url, this.options).toPromise();
  }

  getMe(): Promise<any> {
    const url = `${this.baseUrl}/me`;

    return this.http.get(url, this.options).toPromise();
  }

  setNewPassword(oldPassword: string, newPassword: string): Promise<any> {
    const url = `${this.baseUrl}/change`;
    const body = { oldPassword, newPassword };

    return this.http.post(url, body, this.options).toPromise();
  }
}
