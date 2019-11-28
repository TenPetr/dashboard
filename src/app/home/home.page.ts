import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import {
  LoadingController,
  NavController,
  AlertController
} from "@ionic/angular";
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
  names: Array<any> = [];
  weather: boolean = false;

  constructor(
    public router: Router,
    public navCtrl: NavController,
    public dataService: DataService,
    public authService: AuthService,
    public dateTimeService: DateTimeService,
    private geolocation: Geolocation,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.day = this.dateTimeService.getDate();
    this.month = this.dateTimeService.getMonth();

    this.getCalendar();
    this.getLocation();
  }

  getLocation() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.lat = resp.coords.latitude.toFixed(4);
        this.lon = resp.coords.longitude.toFixed(4);

        this.getWeather();
      })
      .catch(err => {
        this.presentAlert("Error", "To view the weather, enable the location.");
      });
  }

  async getWeather() {
    const loading = await this.loadingController.create({
      message: "Loading data ...",
      spinner: "bubbles"
    });

    await loading.present();

    this.dataService
      .getWeather(this.lat, this.lon)
      .then(res => {
        this.setWeather(res);
        this.weather = true;
        loading.dismiss();
      })
      .catch(() => {
        this.presentAlert("Error", "Network error, couldn't load weather");
        loading.dismiss();
      });
  }

  showProfile() {
    this.router.navigate(["/profile"], { replaceUrl: false });
  }

  setWeather(res) {
    const weather: any = res;

    this.icon = `../../assets/weatherIcons/${weather.icon}.png`;
    this.iconWallpaper = weather.icon;
    this.temperature = weather.temp;
    this.desc = weather.desc;
    this.city = weather.city;
    this.humi = weather.humi;
    this.min_temp = weather.min_temp;
    this.max_temp = weather.max_temp;
  }

  getCalendar() {
    this.dataService
      .getCalendar()
      .then(res => {
        if (!res) throw new Error();

        const calendar: any = res;
        this.names = calendar;
      })
      .catch(err => {
        this.presentAlert("Error", "Failed to load holiday");
      });
  }

  async presentAlert(title: string, text: string) {
    const alert = await this.alertController.create({
      header: title,
      message: text,
      buttons: ["OK"]
    });

    await alert.present();
  }
  v;

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
