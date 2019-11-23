import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private readonly baseUrl = "http://localhost:3000";

  // Headers
  private readonly contentType = { "Content-Type": "application/json" };

  private readonly header = new HttpHeaders(this.contentType);

  private readonly options = { headers: this.header, withCredentials: true };

  constructor(private http: HttpClient) {}

  getWeather(lat: any, lon: any): Observable<any> {
    const url = `${this.baseUrl}/weather`;
    const params = new HttpParams().set("lat", lat).set("lon", lon);

    return this.http.get(url, { params: params, ...this.options });
  }

  getMe(): Observable<any> {
    const url = `${this.baseUrl}/me`;

    return this.http.get(url, this.options);
  }
}
