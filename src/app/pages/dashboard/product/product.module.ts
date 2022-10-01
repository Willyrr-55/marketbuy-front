import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    ProductComponent,
    NewProductComponent,
    AllProductsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    FlexLayoutModule,
    MaterialModule,
    MatExpansionModule
  ]
})
export class ProductModule { }
