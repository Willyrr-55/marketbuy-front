import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCategoryComponent } from './all-category/all-category.component';
import { CategoryComponent } from './category.component';
import { NewCategoryComponent } from './new-category/new-category.component';

const routes: Routes = [
  {
    path:'',
    component:CategoryComponent,
    children:[
      {
        path: 'new-category',
        component: NewCategoryComponent
      },
      {
        path: 'all-category',
        component: AllCategoryComponent
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
