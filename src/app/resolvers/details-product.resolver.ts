import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { ProductService } from '../services/product.service';
import { ProductI } from '../interfaces/product.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetailsProductResolver implements Resolve<ProductI> {

  constructor(private productService: ProductService,private router: Router){}

  resolve(route: ActivatedRouteSnapshot): Observable<ProductI> {
    return this.productService.getDetailProduct(route.paramMap.get('idProduct')).pipe(
      catchError(()=>{
        this.router.navigateByUrl('/dashboard/error-404');
        return EMPTY;
      })
    )
  }
}