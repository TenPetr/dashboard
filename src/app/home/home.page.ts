import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { LoadingController, NavController } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { DataService } from "../services/data.service";
import { DateTimeService } from "../services/datetime.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  icon: string;
  iconWallpaper: string;
  temperature: number;
  min_temp: number;
  max_temp: number;
  desc: string;
  humi: number;
  city: string;
  lat: any;
  lon: any;
  day: string;
  month: string;
  year: number;
  names: Array<string> = [];

  constructor(
    public router: Router,
    public navCtrl: NavController,
    public dataService: DataService,
    public authService: AuthService,
    public dateTimeService: DateTimeService,
    private geolocation: Geolocation,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.getLocation();
    this.day = this.dateTimeService.getDate();
    this.month = this.dateTimeService.getMonth();
    this.getCalendar();
    this.getWeather();
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

  showProfile() {
    this.router.navigate(["/profile"]);
  }

  async getWeather() {
    this.dataService.getWeather(this.lat, this.lon).subscribe(res => {
      const weather: any = res;
      console.log(weather);

      this.icon = `../../assets/weatherIcons/${weather.icon}.png`;
      this.iconWallpaper = weather.icon;
      this.temperature = weather.temp;
      this.desc = weather.desc;
      this.city = weather.city;
      this.humi = weather.humi;
      this.min_temp = weather.min_temp;
      this.max_temp = weather.max_temp;
    });
  }

  async getCalendar() {
    this.dataService.getCalendar().subscribe(res => {
      const calendar: any = res;
      this.names = calendar;
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
        this.router.navigate(["login"], { replaceUrl: true });
        await loading.dismiss();
      },
      async err => {
        this.router.navigate(["login"], { replaceUrl: true });
        await loading.dismiss();
        return throwError(err);
      }
    );
  }

  ngOnDestroy(): void {}
}
