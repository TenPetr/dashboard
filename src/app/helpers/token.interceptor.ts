import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { BehaviorSubject } from "rxjs";
import { catchError, filter, take, switchMap, mergeMap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject(null);

  constructor(private authService: AuthService, public router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (request.headers.get("No-Auth") === "True") {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return this.handleError();
        }
      })
    );
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        mergeMap((res: any) => {
          if (Boolean(res) === true) {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(res);
            return next.handle(request);
          } else {
            return this.handleError();
          }
        }),
        catchError(err => {
          return this.handleError();
        })
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

  handleError() {
    this.isRefreshing = false;
    this.router.navigate(["unauthorized"]);
    return this.authService.logout();
  }
}
