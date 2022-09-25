import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsProductResolver } from 'src/app/resolvers/details-product.resolver';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path:'',
    component:ProductsComponent,
    children:[
      {
        path: 'details/:idProduct',
        resolve: { detailProduct: DetailsProductResolver },
        data: {
          title: 'Detalle del Producto',
          beadcrumb: [
            {
              label: 'Inicio',
              url: '/dashboard/home',
            },
            {
              label: 'Detalle de producto ({{nameProduct}})',
              url: '/dashboard/products/details',
            },
          ],
        },
        component:DetailProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
