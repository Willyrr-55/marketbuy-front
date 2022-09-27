import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductI } from '../interfaces/product.interface';

const baseurlapi = environment.urlApi+'/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient
  ) { }

  searchProducts(search:string,filters:any,page?:number){
    return this.httpClient.get<any>(`${baseurlapi}/searchProducts`,{params:{search,page,filters:JSON.stringify(filters)}});
  }

  getProducts(){
    return this.httpClient.get(`${baseurlapi}/getProducts`);
  }

  getDetailProduct(id:string):Observable<ProductI>{
    return this.httpClient.get<ProductI>(`${baseurlapi}/getProduct/${id}`)
  }

}