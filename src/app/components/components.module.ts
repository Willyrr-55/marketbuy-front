import { MaterialModule } from 'src/app/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { CardProductComponent } from './card-product/card-product.component';
import { SwiperComponent } from './swiper/swiper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchInputComponent } from './search-input/search-input.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { SwiperModule } from 'swiper/angular';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RouterModule } from '@angular/router';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { SelectCategoryComponent } from './select-category/select-category.component';
import { SelectBrandComponent } from './select-brand/select-brand.component';

const components = [
  SwiperComponent,
  CardProductComponent,
  DropzoneComponent,
  ProductComponent,
  SearchInputComponent,
  UploadFilesComponent,
  SelectCategoryComponent,
  SelectBrandComponent,
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
    RouterModule,
    NgSelectModule
  ],
  exports:[
    components
  ]
})
export class ComponentsModule { }
