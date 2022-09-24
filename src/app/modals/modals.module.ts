import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { MaterialModule } from '../material/material.module';
import { LoginFormComponent } from './auth-modal/login-form/login-form.component';
import { RegisterFormComponent } from './auth-modal/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuthModalComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],

  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ModalsModule { }
