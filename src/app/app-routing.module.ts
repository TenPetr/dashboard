import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./helpers/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: "./login/login.module#LoginPageModule"
  },
  {
    path: "register",
    loadChildren: "./register/register.module#RegisterPageModule"
  },
  {
    path: "home",
    loadChildren: "./home/home.module#HomePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "not-found",
    loadChildren: "./not-found/not-found.module#NotFoundPageModule"
  },
  {
    path: "unauthorized",
    loadChildren: "./unauthorized/unauthorized.module#UnauthorizedPageModule"
  },
  {
    path: "**",
    redirectTo: "/not-found",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
