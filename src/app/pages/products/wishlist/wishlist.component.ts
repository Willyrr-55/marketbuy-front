import { Component, OnInit } from '@angular/core';
import { ProductI } from 'src/app/interfaces/product.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  products:ProductI[]=[]
  productsCount:number=1;
  page:number=1;

  constructor(
    private wishlistService: WishlistService,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist(){
    this.wishlistService.getWishlist(this.page).
      subscribe({
        next:(res:any)=>{
          console.log(res)
          this.products = res.data.productIds;
          // this.productsCount = this.products.length;
        },error:(e:any)=>{
          console.log(e)
        }
      })
  }

  removetoToWishlist(productId:string){
    console.log(productId);
    this.wishlistService.removeToWishlist(productId)
      .subscribe({
        next:(res:any)=>{
          this.getWishlist();
          this.alertsService.toastMixin(res.message,'success');

        },error:(e:any)=>{
          console.log(e)
        }
      })

  }

}
