import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    ComponentsModule,
    MatMenuModule,
    RouterModule
  ],
  exports:[
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
