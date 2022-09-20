import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes:Routes =[
  {
    path:'',
    data: {
      title: 'Inicio',
      breadcrumb: [
        {
          label: 'Inicio',
          url: '/home'
        }
      ]
    },
    loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path:'account',
    loadChildren:()=>import('./account/account.module').then(m=>m.AccountModule)
  },
  // {
  //   path:'brands',
  //   loadChildren:()=>import('./brands/brands.module').then(m=>m.BrandsModule)
  // },
  // {
  //   path:'checkout',
  //      data:{
  //     permissions:{
  //       except:['no-auth'],
  //       redirectTo:'/dashboard/home'
  //     }
  //   },
  //   canActivate:[NgxPermissionsGuard],
  //   loadChildren:()=>import('./checkout/checkout.module').then(m=>m.CheckoutModule)
  // },
  // {
  //   path:'cart',
  //   data: {
  //     title: 'Detalles del carrito',
  //     breadcrumb: [
  //       {
  //         label:'Inicio',
  //         url:'/dashboard/home'
  //       },
  //       {
  //         label: 'Carrito',
  //         url: '/dashboard/cart'
  //       }
  //     ],
  //     permissions:{
  //       except:['no-auth'],
  //       redirectTo:'/dashboard/home'
  //     }
  //   },
  //   canActivate:[NgxPermissionsGuard],
  //   loadChildren:()=>import('./cart-page/cart-page.module').then(m=>m.CartPageModule)
  // },

  // {
  //   path:'mobile',
  //   loadChildren:()=>import('./movil/movil.module').then(m=>m.MovilModule)
  // },
  {
    path:'**',
    redirectTo:'/home',
    pathMatch:'full'
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ChildRoutesModule { }
