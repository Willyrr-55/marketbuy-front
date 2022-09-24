import { Component, OnInit } from '@angular/core';
import { ProductI } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products:ProductI[];

  constructor(
    private productService: ProductService

  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  // onSwiper([swiper]) {
  //   console.log(swiper);
  // }
  // onSlideChange() {
  //   console.log('slide change');
  // }

  getProducts(){
    console.log('Realizando consulta')
    this.productService.getProducts().subscribe({
      next:(res:any)=>{
        this.products = res;
        console.log(this.products)
      }
    })
  }

}
