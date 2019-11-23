import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { LoadingController } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  icon: string;
  temperature: number;
  conditions: string;
  city: string;
  lat: any;
  lon: any;

  constructor(
    public dataService: DataService,
    public authService: AuthService,
    public router: Router,
    public loadingController: LoadingController,
    private geolocation: Geolocation
  ) {}

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.lat = resp.coords.latitude.toFixed(4);
        this.lon = resp.coords.longitude.toFixed(4);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async onClick() {
    this.dataService.getWeather(this.lat, this.lon).subscribe(res => {
      const weather: any = res;
      console.log(weather);

      this.icon = `../../assets/weatherIcons/${weather.icon}.png`;
      this.temperature = weather.temp;
      this.conditions = weather.desc;
      this.city = weather.city;
    });
  }

  async logoutUser() {
    const loading = await this.loadingController.create({
      message: "Logging out ...",
      spinner: "bubbles"
    });

    await loading.present();

    this.authService.logout().subscribe(
      async res => {
        this.router.navigate(["login"]);
        await loading.dismiss();
      },
      async err => {
        this.router.navigate(["login"]);
        await loading.dismiss();
        return throwError(err);
      }
    );
  }
}
