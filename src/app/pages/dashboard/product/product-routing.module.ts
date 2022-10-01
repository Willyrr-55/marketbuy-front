import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { EditProductGuard } from './guards/edit-product.guard';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductComponent } from './product.component';


const routes: Routes = [
  {
    path:'',
    component:ProductComponent,
    children:[
      {
        path: 'new-product',
        component: NewProductComponent
      },
      {
        path: 'all-products',
        component: AllProductsComponent
      },
      {
        path:'edit-product',
        canActivate:[EditProductGuard],
        component:NewProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
