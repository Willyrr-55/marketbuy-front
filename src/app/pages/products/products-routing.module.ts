import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './../dashboard/product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsProductResolver } from 'src/app/resolvers/details-product.resolver';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ProductsComponent } from './products.component';
import { WishlistComponent } from './wishlist/wishlist.component';

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
      },
      {
        path:'list/:search',
        data: {
          title: 'Resultados para'
        },
        component:ProductListComponent
      },
      {
        path: 'wishlist',
        data: {
          title: 'Favoritos',
          breadcrumb: [
            {
              label: 'Inicio',
              url: 'home',
            },
            {
              label: 'Favoritos',
              url: 'wishlist',
            },
          ],
        },
        component: WishlistComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
