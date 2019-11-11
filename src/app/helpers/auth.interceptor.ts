import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get("No-Auth") === "True") return next.handle(req.clone());

    if (this.authService.getToken) {
      const request = this.addToken(req, this.authService.getToken());
      return next.handle(request).pipe(
        tap(
          event => {},
          error => {
            if (error.status === 401) {
              this.router.navigate(["unauthorized"]);
              // refresh token?
              // smazat localStorage?
            }
          }
        )
      );
    }
  }

  addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        "x-auth-token": token
      }
    });
  }
}
