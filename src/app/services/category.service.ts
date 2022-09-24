import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseurlapi = environment.urlApi+'/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  registerCategory(data:FormData){
    return this.httpClient.post(`${baseurlapi}/createCategory`,data)
  }

  getCategories(){
    return this.httpClient.get(`${baseurlapi}/getCategories`);
  }
  
}
