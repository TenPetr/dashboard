import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, switchMap, filter, take } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { throwError, BehaviorSubject } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (this.authService.getToken()) {
      request = this.addToken(request, this.authService.getToken());
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleError(request, next);
        } else {
          this.authService.doLogoutUser();
          return throwError(error);
        }
      })
    );
  }

  private handleError(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((tokens: any) => {
          console.log(tokens);
          this.isRefreshing = false;
          this.refreshTokenSubject.next(tokens.token);
          return next.handle(this.addToken(request, tokens.token));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        })
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
