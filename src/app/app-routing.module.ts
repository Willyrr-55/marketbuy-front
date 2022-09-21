import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { PagesComponent } from './pages/pages.component';

const routerOptions:ExtraOptions = {
  scrollPositionRestoration:'enabled'
}

const routes: Routes = [
  {
    path:'dashboard',
    pathMatch:'prefix',
    redirectTo:''
  },
  {
    path:"auth",
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'',
    component:PagesComponent,
    loadChildren:()=>import('./pages/child-routes.module').then(m=>m.ChildRoutesModule)
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions), PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
