import { BrandI } from "./brand.interface";
import { CategoryI } from "./category.interface";

export interface ProductI
{
  _id?:string,
  name:string,
  description:string,
  photos?:PhotoProductI[],
  price:number,
  stock:number,
  category:CategoryI,
  brand:BrandI,
  status:boolean,
}

export interface ProducFilter
{
  _id:string,
  name:string,
  stock:number,
  category:CategoryI,
  brand:BrandI,
  status:boolean,
}

export interface PhotoProductI {
  url: string;
  asset_id: string;
  public_id?: 'string';
}

export interface EditPro
{
  name:string,
  description:string,
  price:number,
  stock:number,
  category:CategoryI,
  brand:BrandI,
  status:boolean,
}