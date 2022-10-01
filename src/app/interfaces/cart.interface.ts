
import { ProductI } from "./product.interface";

export interface CartModelServer {
  total: number;
  data: [{
    product: ProductI,
    numInCart: number
  }];
}

export interface CartModelPublic {
  total: number;
  prodData: [{
    _id: string,
    incart: number
  }]
}
