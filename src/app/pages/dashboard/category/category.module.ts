import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AllCategoryComponent } from './all-category/all-category.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
  declarations: [
    CategoryComponent,
    NewCategoryComponent,
    AllCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ComponentsModule,
    FlexLayoutModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    MatRadioModule,
    MatInputModule,
    MatBadgeModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
