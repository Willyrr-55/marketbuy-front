import { AuthModalComponent } from 'src/app/modals/auth-modal/auth-modal.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, tap } from 'rxjs/operators';

import {AlertsService} from '../../../services/alerts.service'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  hide = true;

  showPassword:boolean = false;
  showConfirmPassword:boolean = false;

  formSubmited:boolean = true;

  formRegister!:FormGroup;

  date:any;

  constructor(
    private formBuilder: FormBuilder,
    private ngxSpinnerService: NgxSpinnerService,
    private router: Router,
    private alertsService: AlertsService,
    private authService: AuthService,
    private matDialog:MatDialogRef<AuthModalComponent>
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  getControl(name:string){
    return this.formRegister.get(name);
  }

  getErrorMessageName(){
    const full_name = this.formRegister.get('full_name');
    if(full_name.hasError('required')){
      return 'El nombre es requerido';
    }

    if(full_name.hasError('pattern')){
      return 'Ingrese un nombre válido'
    }

    return '';
  }

  getErrorMessagePhoneNumber(){
    const phone_number = this.formRegister.get('phone_number');
    if(phone_number.hasError('required')){
      return 'El número de teléfono es requerido';
    }

    return '';
  }

  getErrorMessageEmail(){
    const email = this.formRegister.get('email');
    if(email.hasError('required')){
      return 'El email es requerido';
    }

    if(email.hasError('pattern')){
      return 'Ingrese un email válido'
    }

    return '';
  }

  getErrorMessagePassword() {
    const password = this.formRegister.get('password');
    if (password.hasError('required')) {
      return 'La contraseña es requerida.';
    }

    return '';
  }


  createForm(){
    this.formRegister = this.formBuilder.group({
      full_name:['',[Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email:['',[Validators.required,Validators.pattern(/^\S+@\S+\.\S+$/)]],
      phone_number:['',[Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  async register(){
    if(this.formRegister.valid){
      await this.ngxSpinnerService.show('generalSpinner');
      this.authService.register(this.formRegister.value).pipe(
        finalize(async()=>{
          await this.ngxSpinnerService.hide('generalSpinner');
        }),
        tap((res:any)=>{
          localStorage.setItem('x-access-token',res.token);
          localStorage.setItem('user-info',JSON.stringify(res.user));
        })
      ).subscribe({
        next:(res)=>{
          this.authService.setRoles(res.token);
          this.alertsService.toastMixin(res['message'],'success');
          this.matDialog.close();
        },
        error:((e:any)=>{
          this.alertsService.toastMixin(e.error.message,'error');
        })
      });

    }
  }
}
