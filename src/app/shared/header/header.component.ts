import { Component, OnInit } from '@angular/core';
import { AuthModalComponent } from 'src/app/modals/auth-modal/auth-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../modals/auth-modal/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CartModelServer } from 'src/app/interfaces/cart.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {



  cartData: CartModelServer;
  cartTotal: Number;

  constructor(
    public cartService: CartService,
    private matDialog: MatDialog,
    public authService: AuthService
  ) { }

  ngOnInit(): void {

    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartDataObs$.subscribe(data => {

      this.cartData = data
    });
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  authModal() {
    const dialogRef = this.matDialog.open(AuthModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  deteleCart(id) {
  this.cartService.DeleteProductFromCart(id)
  }

}
