import { MaterialModule } from 'src/app/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from './card-product/card-product.component';
import { SwiperComponent } from './swiper/swiper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchInputComponent } from './search-input/search-input.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneComponent } from './dropzone/dropzone.component';

import { ProductComponent } from './product/product.component';
import { SwiperModule } from 'swiper/angular';

const components = [
  SwiperComponent,
  CardProductComponent,
  SearchInputComponent,
  DropzoneComponent,
  ProductComponent,
  SearchInputComponent

]


@NgModule({
  declarations: [
    components,
  ],
  imports: [
    CommonModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    SwiperModule,
    NgxDropzoneModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  exports:[
    components
  ]
})
export class ComponentsModule { }
