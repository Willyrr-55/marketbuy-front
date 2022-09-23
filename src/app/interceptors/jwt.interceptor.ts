import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, EMPTY, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
// import { AlertsService } from '../services/alerts.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    // private alertsService: AlertsService,
     private authService: AuthService) {
     }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.authService.getToken()){
      request = this.setToken(request,this.authService.getToken());
    }
    return next.handle(request).pipe(catchError(error=>{
      if(error instanceof HttpErrorResponse && error.status ===401){
        return this.handle401Error(request,next);
      }else{
        if(error instanceof HttpErrorResponse && error.status ===400 && error['error']['reLogin']){
          this.authService.logout();
        }
        return throwError(error);
      }
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler):Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token['token']);
          return next.handle(this.setToken(request, token['token']));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.setToken(request, jwt));
        }));
    }
  }


  setToken(req:HttpRequest<any>,token){
    return req.clone({
      setHeaders:{
        'x-access-token':token
      }
    });
  }
}
