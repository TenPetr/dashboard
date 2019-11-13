import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get("No-Auth") === "True") return next.handle(req.clone());

    if (this.authService.getToken()) {
      const request = this.addToken(req);
      return next.handle(request).pipe(
        tap(
          event => {},
          error => {
            if (error.status === 401) {
              return this.authService.logoutUser();
              // REFRESH TOKEN?
            }
          }
        )
      );
    }
  }

  addToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        "x-auth-token": this.authService.getToken()
      }
    });
  }
}
