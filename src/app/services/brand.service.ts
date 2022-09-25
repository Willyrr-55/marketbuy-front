import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BrandI } from '../interfaces/brand.interface';


const baseurlapi = environment.urlApi+'/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {


  constructor(private httpClient: HttpClient) { }

  registerBrand(data: FormData){

    return this.httpClient.post(`${baseurlapi}/createBrand`,data)
  }

  getBrands(){
    return this.httpClient.get(`${baseurlapi}/getBrands`);
  }

  editBrand( brand: BrandI){
    console.log(brand)
    return this.httpClient.put(`${baseurlapi}/updateBrand?id=${brand._id}`,brand)
  }

  changeStatus( id:string, status: boolean){
    return this.httpClient.put(`${baseurlapi}/changeStatus?id=${id}&status=${status}`, '')
  }
  uploadPhoto(id:string,data:FormData){
    return this.httpClient.put(`${baseurlapi}/changePhoto?id=${id}`,data)
  }

}