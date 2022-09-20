import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routerOptions:ExtraOptions = {
  scrollPositionRestoration:'enabled'
}

const routes: Routes = [
  {
    path:"auth",
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'**',
    redirectTo:'/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions), PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
