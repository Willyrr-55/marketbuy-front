import { BrandI } from "./brand.interface";
import { CategoryI } from "./category.interface";

export interface ProductI
{
  _id?:string,
  name:string,
  description:string,
  photos:any[],
  price:number,
  stock:number,
  category:CategoryI,
  brand:BrandI,
  status:boolean,
}
