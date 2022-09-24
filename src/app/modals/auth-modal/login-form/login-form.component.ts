import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthModalComponent } from 'src/app/modals/auth-modal/auth-modal.component';
import { AlertsService } from 'src/app/services/alerts.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  hide = true;

  formSubmited:boolean = true;

  formLogin!:FormGroup;

  date:any;

  constructor(
    private formBuilder: FormBuilder,
    private ngxSpinnerService: NgxSpinnerService,
    private router: Router,
    private authService: AuthService,
    private matDialog :MatDialogRef<AuthModalComponent>,
    private alertsService: AlertsService,
    private jwtHelperService: JwtHelperService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  getControl(name:string){
    return this.formLogin.get(name);
  }

  getErrorMessageEmail(){
    const email = this.formLogin.get('email');
    if(email.hasError('required')){
      return 'El email es requerido';
    }

    if(email.hasError('pattern')){
      return 'Ingrese un email válido'
    }

    return '';
  }

  getErrorMessagePassword() {
    const password = this.formLogin.get('password');
    if (password.hasError('required')) {
      return 'La contraseña es requerida.';
    }

    return '';
  }

  createForm(){
    this.formLogin = this.formBuilder.group({
      email:['',[Validators.required,Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password: ['', [Validators.required]],
    });
  }

  async login(){
    this.formSubmited = true;
    if(this.formLogin.value){
      await this.ngxSpinnerService.show('generalSpinner');
      this.authService.login(this.formLogin.value).pipe(
        tap((res: any)=>{
          console.log(res)
         
          localStorage.setItem('x-access-token', res['token']);
          // localStorage.setItem('user-info', JSON.stringify(tokenDecode.user));
        }),
        finalize(async()=>{
          await this.ngxSpinnerService.hide('generalSpinner');
        })
      ).subscribe({
        next:(res:any)=>{
          this.matDialog.close();
          this.authService.setRoles(res.token);
          this.authService.currentUser$.next(res.user);
          this.alertsService.toastMixin('Has iniciado sesión correctamente','success');
          this.router.navigateByUrl('/');
        },
        error:(e)=>{
          const message = e['error']['message'];
          this.alertsService.toastMixin(message?message:'Ocurrió un error','error');
        }
      });
    }
  }
}
