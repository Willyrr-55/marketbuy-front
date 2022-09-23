import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductI } from 'src/app/interfaces/product.interface';
import { AuthModalComponent } from 'src/app/modals/auth-modal/auth-modal.component';
import { ProductService } from 'src/app/services/product.service';
import SwiperCore from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products:ProductI[];

  constructor(
    private productService: ProductService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  openDialog() {
    const dialogRef = this.dialog.open(AuthModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
        console.log(res)
      }
    })
  }

}
