import { Component } from "@angular/core";
import { DataService } from "../services/data.service";
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage {
  username: string;

  constructor(
    public dataService: DataService,
    public navCtrl: NavController,
    public router: Router
  ) {}

  ngOnInit() {
    this.getMe();
  }

  getMe() {
    this.dataService.getMe().subscribe(res => {
      this.username = res.username;
    });
  }

  navigateBack() {
    this.router.navigate(["/home"], { replaceUrl: true });
  }

  ngOnDestroy(): void {}
}
