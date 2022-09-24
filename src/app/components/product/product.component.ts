import { Component, Input, OnInit } from '@angular/core';
import { ProductI } from 'src/app/interfaces/product.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product:ProductI;

  constructor(
    private wishlistService: WishlistService,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
  }

  addProductToWishlsit(idProduct:string){
    this.wishlistService.addProductToWishlist(idProduct)
      .subscribe({
        next:(res:any)=>{
          this.alertsService.toastMixin(res.message,'success');
      },error:(e:any)=>{
          this.alertsService.toastMixin(e.error.message,'error');
      }});
  }

}
