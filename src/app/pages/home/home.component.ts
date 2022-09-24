import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/auth/auth.service';
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
    private productService: ProductService,
    private authService: AuthService,
    private jwtHelperService: JwtHelperService,
  ) { }

  ngOnInit(): void {
    this.getProducts()
    let token= this.authService.getToken()
    const tokenDecode = this.jwtHelperService.decodeToken(token);
    console.log(tokenDecode)
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
       this.products = res
       console.log(this.products)
      }
    })
  }

}
