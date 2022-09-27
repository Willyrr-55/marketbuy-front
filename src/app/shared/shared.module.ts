import { NgxPermissionsModule } from 'ngx-permissions';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    NgxPermissionsModule,
    RouterModule
  ],
  exports:[
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
