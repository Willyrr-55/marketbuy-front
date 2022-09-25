import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryI } from '../interfaces/category.interface';

const baseurlapi = environment.urlApi+'/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  registerCategory(data: FormData){

    return this.httpClient.post(`${baseurlapi}/createCategory`,data)
  }

  getCategories(){
    return this.httpClient.get(`${baseurlapi}/getCategories`);
  }

  editCategory(category: CategoryI){

    return this.httpClient.put(`${baseurlapi}/updateCategory?id=${category._id}`,category)
  }

  changeStatus( id:string, status: boolean){
    return this.httpClient.put(`${baseurlapi}/changeStatus?id=${id}&status=${status}`, '')
  }
  
  uploadPhoto(id:string,data:FormData){
    return this.httpClient.put(`${baseurlapi}/changePhoto?id=${id}`,data)
  }
  
}

