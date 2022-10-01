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

  searchProducts(filters:any){
    return this.httpClient.get<any>(`${baseurlapi}/filterProducts`,{params:{...filters}});
  }

  getProducts(){
    return this.httpClient.get(`${baseurlapi}/getProducts`);
  }

  getDetailProduct(id:string):Observable<ProductI>{
    return this.httpClient.get<ProductI>(`${baseurlapi}/getProduct/${id}`)
  }

  registerProduct(productData: FormData){
    return this.httpClient.post<ProductI>(`${baseurlapi}/createProduct`, productData)
  }

  editProduct(productData: ProductI){
    return  this.httpClient.put<ProductI>(`${baseurlapi}/updateProduct`, productData)
  }

  uploadPhoto(id: string,photo: FormData){
    return this.httpClient.put<ProductI>(`${baseurlapi}/registerProduct`, photo)
  }

}