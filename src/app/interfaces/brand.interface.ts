import { PhotoI } from "./photo.interface";

export interface BrandI
{
  _id?:string,
  name:string,
  description:string,
  status:boolean,
  photo?:PhotoI
}
