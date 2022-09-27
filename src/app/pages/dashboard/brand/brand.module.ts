import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { NewBrandComponent } from './new-brand/new-brand.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { AllBrandsComponent } from './all-brands/all-brands.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    BrandComponent,
    NewBrandComponent,
    AllBrandsComponent
  ],
  imports: [
    CommonModule,
    BrandRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    FlexLayoutModule,
  ]
})
export class BrandModule { }
