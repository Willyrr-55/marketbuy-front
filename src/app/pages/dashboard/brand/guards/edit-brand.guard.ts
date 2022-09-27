import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EditBrandGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(): boolean {
    const state:any = this.router.getCurrentNavigation().extras.state;
    if(state?.element){
      return true;
    }else{
      this.router.navigateByUrl('/dashboard/brands/all-brands');
      return false;
    }
  }

}
