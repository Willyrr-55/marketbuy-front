import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import {finalize, tap} from 'rxjs/operators'
// import { UserI } from '../interfaces/user.interface';
import { NgxRolesService } from 'ngx-permissions';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
// import { ModalsService } from '../services/modals.service';
import { AlertsService } from '../services/alerts.service';
// import { ModalsService } from '../services/modals.service';
import { ToastrService } from 'ngx-toastr';

const baseurlapi = environment.urlApi + '/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private httpClient: HttpClient,
    private ngxRolesService: NgxRolesService,
    private jwtHelperService: JwtHelperService,
    private router: Router,
    // private modalsService: ModalsService,
    private toast: ToastrService,
    private ngxSpinnerService: NgxSpinnerService,
    private alertsService: AlertsService,
    // private modalsService:ModalsService
    ) {}

  async logIn(email:string,password:string,modal?:boolean){

    // await this.ngxSpinnerService.show('generalSpinner');
    this.httpClient.post(`${baseurlapi}/signin`,{email,password}).pipe(
      tap((res:any)=>{
        localStorage.setItem('x-access-token', res['token']);
      }),
      finalize(async()=>{
        // await this.ngxSpinnerService.hide('generalSpinner');
      })
    ).subscribe({
      next:(res:any)=>{
        this.setRoles(res.token);
        if(modal){
          // this.closeSignModal();
        }else{
          this.router.navigateByUrl('/dashboard/account/my-orders')
        }
        // this.router.navigateByUrl('/dashboard');
        this.toast.success('Has iniciado sesión correctamente', "Inicio de sesión", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
        // this.alertsService.toastMixin('Has iniciado sesión correctamente','success');
      },
      error:(e)=>{
        const message = e['error']['message'];
        console.log(message)
        this.toast.error(message?message:'Ocurrió un error', '', {
          timeOut: 2000,
          progressBar: true,
        });
        // this.alertsService.toastMixin(message?message:'Ocurrió un error','error');
      }
    });
  }

    confirmEmail(token:any){
      return this.httpClient.put(`${baseurlapi}/confirmEmail`,{},{params:{token}});
    }

    recovery(email:string){
      console.log(email)
      return this.httpClient.post(`${baseurlapi}/recovery`,{email});
    }

    resendValidationAccountCode(email:string){
      return this.httpClient.post(`${baseurlapi}/resendValidationAccountCode`,{email});
    }

    async changePassword(data:any){
      await this.ngxSpinnerService.show('generalSpinner');
    this.httpClient.put(`${baseurlapi}/changePassword`,data).pipe(
      tap((res:any)=>{
        localStorage.setItem('x-access-token', res['token']);
      }),
      finalize(async()=>{
        await this.ngxSpinnerService.hide('generalSpinner');
      })
    ).subscribe({
      next:(res:any)=>{
        this.alertsService.toastMixin(res.message,'success',5000);
        this.router.navigateByUrl('/auth');
      },
      error:(e)=>{
        const message = e['error']['message'];
        this.alertsService.toastMixin(message?message:'Ocurrió un error','error',5000);
      }
    });
    }

    async register(data:any){
    await this.ngxSpinnerService.show('generalSpinner');
    this.httpClient.post(`${baseurlapi}/register`,data).pipe(
      // tap((res)=>{
      //   localStorage.setItem('x-access-token', res['token']);
      // }),
      finalize(async()=>{
        await this.ngxSpinnerService.hide('generalSpinner');
      })
    ).subscribe({
      next:(res:any)=>{
        // this.modalsService.closeModal('signin-modal')
        this.alertsService.toastMixin(res.message,'success',6000)
        this.router.navigateByUrl('/dashboard');
      },
      error:(e)=>{
        const message = e['error']['message'];
        this.alertsService.toastMixin(message?message:'Ocurrió un error','error');
      }
    });
  }

  load() {
    // Asegurarse que este metodo se este ejecutando en el app.component.ts en el ngOnInit
    const token = localStorage.getItem('x-access-token');
    this.ngxRolesService.flushRoles();
    try {
      const tokenDecode = this.jwtHelperService.decodeToken(token);
      this.userInfo.next(tokenDecode.user);

      tokenDecode.role.forEach(role => {
        this.ngxRolesService.addRole(role.name, []);
      });
    } catch (e) {
      this.ngxRolesService.addRole('no-auth', []);
      this.logout();
    }
  }

  setRoles(token) {
    this.ngxRolesService.flushRoles();
    const tokenDecode = this.jwtHelperService.decodeToken(token);
    this.userInfo.next(tokenDecode.user);

    tokenDecode.role.forEach(role => {
      this.ngxRolesService.addRole(role.name, []);
    });
  }

  getUserInfo(){
    return this.userInfo.asObservable();
  }

  getToken() {
    return localStorage.getItem('x-access-token');
  }

  refreshToken() {
    return this.httpClient.get(`${baseurlapi}/renew`, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } })
      .pipe(tap((token) => { localStorage.setItem('x-access-token', token['token']) }))
  }

  // closeSignModal(){
  //   this.modalsService.closeModal('signin-modal');
  // }

  logout(){
    localStorage.removeItem('x-access-token');
    this.userInfo.next(null);
    this.ngxRolesService.flushRoles();
    this.ngxRolesService.addRole('no-auth',[]);
    // this.router.navigateByUrl('/dashboard/home')
  }
}
