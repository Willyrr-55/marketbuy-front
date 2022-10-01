import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EditProductGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(): boolean {
    const state:any = this.router.getCurrentNavigation().extras.state;
    console.log(state)
    if(state?.product){
      return true;
    }else{
      this.router.navigateByUrl('/dashboard/options/products/all-products');
      return false;
    }
  }

}
