import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBrandsComponent } from './all-brands/all-brands.component';
import { BrandComponent } from './brand.component';
import { EditBrandGuard } from './guards/edit-brand.guard';
import { NewBrandComponent } from './new-brand/new-brand.component';


const routes: Routes = [
  {
    path:'',
    component:BrandComponent,
    children:[
      {
        path: 'new-brand',
        component: NewBrandComponent
      },
      {
        path: 'all-brands',
        component: AllBrandsComponent
      },
      {
        path:'edit-brand',
        component:NewBrandComponent,
        canActivate:[EditBrandGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
