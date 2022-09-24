import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    AuthModalComponent
  ],

  imports: [
    CommonModule,

    MaterialModule
  ]
})
export class ModalsModule { }
