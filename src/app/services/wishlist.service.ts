import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseurlapi = environment.urlApi + '/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(
    private httpClient: HttpClient
  ) { }

  addProductToWishlist(productId:string){
    return this.httpClient.post(`${baseurlapi}/addProductToWishlist`, {productId})
  }

  getWishlist(page:number){
    return this.httpClient.get(`${baseurlapi}/getWishlist`,{params:{page}});
  }

  getWishlistCount(){
    return this.httpClient.get(`${baseurlapi}/getWishlistCount`);
  }

  removeToWishlist(productId){
    return this.httpClient.delete(`${baseurlapi}/removeProductToWishlist`,{params:{productId}})
  }
}
