import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EditCategoryGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(): boolean {
    const state:any = this.router.getCurrentNavigation().extras.state;
    console.log(state?.category)
    if(state?.category){
      return true;
    }else{
      this.router.navigateByUrl('/dashboard/category/all-category');
      return false;
    }
  }

}
