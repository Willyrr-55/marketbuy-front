import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhotoI } from '../interfaces/photo.interface';
import { PhotoProductI, ProducFilter, ProductI } from '../interfaces/product.interface';

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

  filterProducts(product: ProducFilter){
    if(product._id != ''){
      console.log('con id')
      return this.httpClient.get(`${baseurlapi}/filterProducts?_id=${product._id}&name=${product.name}&stock=${product.stock}&status=${product.status}&category=${product.category}&brand=${product.brand}`);
    }else{
      console.log('sin id')
      return this.httpClient.get(`${baseurlapi}/filterProducts?name=${product.name}&stock=${product.stock}&status=${product.status}&category=${product.category}&brand=${product.brand}`);
    }
  }

  getDetailProduct(id:string):Observable<ProductI>{
    return this.httpClient.get<ProductI>(`${baseurlapi}/getProduct/${id}`)
  }

  registerProduct(productData: FormData){
    return this.httpClient.post<ProductI>(`${baseurlapi}/createProduct`, productData)
  }

  editPro(id:string,data:ProductI){
    return this.httpClient.put(`${baseurlapi}/updatePro?id=${id}`,data)
  }

  addPhoto(id:string,data:FormData){
    return this.httpClient.put(`${baseurlapi}/addPhoto?id=${id}`,data)
  }

  deletePhoto(id:string,photo: PhotoProductI){
    return this.httpClient.put(`${baseurlapi}/deletePhoto?id=${id}`, photo)
  }

  changeStatus( id:string, status: boolean){
    return this.httpClient.put(`${baseurlapi}/changeStatus?id=${id}&status=${status}`, '')
  }
  

  registerorder(orderData: any){
    return this.httpClient.post<ProductI>(`/order/createOrder`, orderData)
  }

}
