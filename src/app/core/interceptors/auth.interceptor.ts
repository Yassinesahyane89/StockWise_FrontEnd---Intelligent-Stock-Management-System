import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth/auth.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
      private authService: AuthService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    const token = this.authService.getToken();
    if(!request.url.includes('auth/login') && !request.url.includes('auth/register' )){
      console.log('Intercepted')
      if (token != null && token != undefined && token != '') {
        console.log('Token found');
        authReq = this.addTokenHeader(request, token);
      }
      return next.handle(authReq).pipe(
            catchError((error, caught) => {
                if (error.status === 401) {
                  this.authService.logout();
                }
                  return throwError(error);
            })
      )
    }else {
      return next.handle(request);
    }
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
