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

const components = [
  SwiperComponent,
  CardProductComponent,
  SearchInputComponent,
  DropzoneComponent
]


@NgModule({
  declarations: [
    components,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,
    FlexLayoutModule

  ],
  exports:[
    components
  ]
})
export class ComponentsModule { }
