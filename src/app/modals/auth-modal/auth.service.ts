import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxRolesService } from 'ngx-permissions';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserI } from './interfaces/user.interface';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alerts.service';

const url_api = environment.urlApi+'/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$:BehaviorSubject<UserI> = new BehaviorSubject<UserI>(null);

  constructor(
    private httpClient: HttpClient,
    private ngxRolesService: NgxRolesService,
    private jwtHelperService: JwtHelperService,
    private router: Router,
    private ngxSpinnerService: NgxSpinnerService,
    private alertsService: AlertsService
  ) {
    const userInfo = localStorage.getItem('user-info');
    if(userInfo){
      this.currentUser$.next(JSON.parse(userInfo));
    }
   }

  register(userData:UserI){
    return this.httpClient.post(`${url_api}/signUp`,userData);
  }

  login(loginData:{email:string,password:string}){
    return this.httpClient.post(`${url_api}/login`,loginData);
  }

  load() {
    const token = localStorage.getItem('x-access-token');
    this.ngxRolesService.flushRoles();
    try {
      const tokenDecode = this.jwtHelperService.decodeToken(token);
      // this.userInfo.next(tokenDecode.user);
      this.ngxRolesService.addRole(tokenDecode.role, []);
    } catch (e) {
      this.ngxRolesService.addRole('no-auth', []);
      // this.logout('/');
    }
  }

  logout(){
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('user-info')
    this.currentUser$.next(null);
    this.ngxRolesService.flushRoles();
    this.ngxRolesService.addRole('no-auth',[]);
    this.router.navigateByUrl('/')
  }

  getToken() {
    return localStorage.getItem('x-access-token');
  }

  refreshToken() {
    return this.httpClient.get(`${url_api}/renew`, { headers: { 'authorization': `Bearer ${localStorage.getItem('x-access-token')}` } })
      .pipe(tap((token) => { localStorage.setItem('x-access-token', token['token']) }))
  }


  setRoles(token) {
    this.ngxRolesService.flushRoles();
    const tokenDecode = this.jwtHelperService.decodeToken(token);

    this.ngxRolesService.addRole(tokenDecode.role, []);
  }

}
