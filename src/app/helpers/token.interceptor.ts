import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { catchError, filter, take, switchMap } from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers.get("No-Auth") === "True") {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.handle404Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  handle404Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().subscribe(
        (res: any) => {
          if (Boolean(res) === true) {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(res);
            return next.handle(request);
          } else {
            return this.authService.logout();
          }
        },
        err => {
          return this.authService.logout();
        },
        () => {
          this.isRefreshing = false;
        }
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(res => res != null),
        take(1),
        switchMap(() => {
          return next.handle(request);
        })
      );
    }
  }
}
