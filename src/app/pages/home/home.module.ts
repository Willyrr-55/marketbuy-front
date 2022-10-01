import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ModalsModule } from 'src/app/modals/modals.module';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    NgxPayPalModule,
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ModalsModule,
    SwiperModule,
    ComponentsModule
  ]
})
export class HomeModule { }
