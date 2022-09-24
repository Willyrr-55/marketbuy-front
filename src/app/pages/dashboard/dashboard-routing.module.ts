import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    children:[
      {
        path:'category',
        loadChildren:()=>import('../dashboard/category/category.module').then(m=>m.CategoryModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
