import { Component, OnInit } from '@angular/core';
import { ProductI } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products:ProductI[];

  constructor(
    private productService: ProductService

  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.productService.getProducts().subscribe({
      next:(res:any)=>{
        this.products = res;
        console.log(this.products)
      }
    })
  }

}