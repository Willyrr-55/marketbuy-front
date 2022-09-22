import { PhotoI } from "./photo.interface";

export interface CategoryI
{
  _id:string,
  namr:string,
  description:string,
  status:boolean,
  photo:PhotoI
}
