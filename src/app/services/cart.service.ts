import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { CartModelPublic, CartModelServer } from '../interfaces/cart.interface';
import { BehaviorSubject } from 'rxjs';

import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from './product.service';
import { ProductI } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  isDelivery: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  ofice: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  first_time: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  first_time_no: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public cartDataClient: CartModelPublic = {
    prodData: [{ incart: 0, _id: '' }],
    total: 0,
  };
  // This will be sent to the backend Server as post data

  // Cart Data variable to store the cart information on the server
  private cartDataServer: CartModelServer = {
    data: [
      {
        product: undefined,
        numInCart: 0,
      },
    ],
    total: 0,
  };

  cartTotal$ = new BehaviorSubject<number>(0);
  // Data variable to store the cart information on the client's local storage

  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private router: Router,
    private http: HttpClient,
    private productService: ProductService
  ) {
    this.cartTotal$.next(this.cartDataServer.total);
    this.cartDataObs$.next(this.cartDataServer);
    let info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));
    if (info !== null && info !== undefined && info.prodData[0].incart !== 0) {
      // assign the value to our data variable which corresponds to the LocalStorage data format
      this.cartDataClient = info;
      // Loop through each entry and put it in the cartDataServer object
      this.cartDataClient.prodData.forEach((p) => {
        this.productService
          .getDetailProduct(p._id)
          .subscribe((actualProdInfo: ProductI) => {
            console.log(actualProdInfo)
            const producto = actualProdInfo['product'];
            if (this.cartDataServer.data[0].numInCart === 0) {
              this.cartDataServer.data[0].numInCart = p.incart;
              this.cartDataServer.data[0].product = producto;
              this.CalculateTotal();
              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            } else {
              this.cartDataServer.data.push({
                numInCart: p.incart,
                product: producto,
              });
              this.CalculateTotal();
              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            }
            this.cartDataObs$.next({ ...this.cartDataServer });
          });
      });
    }
  }

  CalculateSubTotal(index): number {
    let subTotal = 0;

    let p = this.cartDataServer.data[index];
    console.log(p)
    // @ts-ignore
    subTotal = p.product.price * p.numInCart;

    return subTotal;
  }

  private CalculateTotal() {
    let Total = 0;

    this.cartDataServer.data.forEach((p) => {
      const { numInCart } = p;
      console.log(p)
      const { price } = p.product;
      // @ts-ignore
      Total += numInCart * price;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  private resetServerData() {
    this.cartDataServer = {
      data: [
        {
          product: undefined,
          numInCart: 0,
        },
      ],
      total: 0,
    };
    this.cartDataObs$.next({ ...this.cartDataServer });
  }

  AddProductToCart(id: String, quantity?: number) {
    let info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));
    if (info == null || info == undefined) {
      this.cartDataClient = { prodData: [{ incart: 0, _id: '' }], total: 0 };
      this.cartDataServer = {
        data: [
          {
            product: undefined,
            numInCart: 0,
          },
        ],
        total: 0,
      };
      this.cartDataObs$.next({
        data: [
          {
            product: undefined,
            numInCart: 0,
          },
        ],
        total: 0,
      });
    }

    this.productService.getDetailProduct(id.toString()).subscribe((prod) => {
      console.log(prod)
      const producto = prod['product'];

      if (this.cartDataServer.data[0].product === undefined) {
        this.cartDataServer.data[0].product = producto;
        this.cartDataServer.data[0].numInCart =
          quantity !== undefined ? quantity : 1;
        this.CalculateTotal();
        this.cartDataClient.prodData[0].incart =
          this.cartDataServer.data[0].numInCart;
        this.cartDataClient.prodData[0]._id = producto._id;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({ ...this.cartDataServer });
        this.toast.success(
          `${producto.name} added to the cart.`,
          'Producto añadido',
          {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-left',
          }
        );
      } // END of IF
      // Cart is not empty
      else {
        let index = this.cartDataServer.data.findIndex(
          (p) => p.product._id === producto._id
        );

        // 1. If chosen product is already in cart array
        if (index !== -1) {
          if (quantity !== undefined && quantity <= producto.stock) {
            // @ts-ignore
            this.cartDataServer.data[index].numInCart =
              this.cartDataServer.data[index].numInCart < producto.stock
                ? quantity
                : producto.stock;
          } else {
            // @ts-ignore
            this.cartDataServer.data[index].numInCart < producto.stock
              ? this.cartDataServer.data[index].numInCart++
              : producto.quantity;
          }

          this.cartDataClient.prodData[index].incart =
            this.cartDataServer.data[index].numInCart;
          this.toast.info(
            `${producto.name} quantity updated in the cart.`,
            'Producto actualizado',
            {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            }
          );
        }
        // 2. If chosen product is not in cart array
        else {
          this.cartDataServer.data.push({
            product: producto,
            numInCart: 1,
          });
          this.cartDataClient.prodData.push({
            incart: 1,
            _id: producto._id,
          });
          this.toast.success(
            `${producto.name} added to the cart.`,
            'Producto añadido',
            {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            }
          );
        }
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({ ...this.cartDataServer });
      } // END of ELSE
    });
  }
  DeleteProductFromCart(index) {
    /*    console.log(this.cartDataClient.prodData[index].prodId);
        console.log(this.cartDataServer.data[index].product.id);*/

    if (window.confirm('¿Estás seguro de que quieres eliminar el artículo?')) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = { prodData: [{ incart: 0, _id: '' }], total: 0 };
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = {
          data: [
            {
              product: undefined,
              numInCart: 0,
            },
          ],
          total: 0,
        };
        this.cartDataObs$.next({ ...this.cartDataServer });
      } else {
        this.cartDataObs$.next({ ...this.cartDataServer });
      }
    }
    // If the user doesn't want to delete the product, hits the CANCEL button
    else {
      return;
    }
  }

  // CheckoutFromCart(userId: Number) {

  //   this.http.post(`${this.SERVER_URL}orders/payment`, null).subscribe((res: { success: Boolean }) => {
  //     console.clear();

  //     if (res.success) {

  //       this.resetServerData();
  //       this.http.post(`${this.SERVER_URL}orders/new`, {
  //         userId: userId,
  //         products: this.cartDataClient.prodData
  //       }).subscribe((data: OrderConfirmationResponse) => {

  //         this.orderService.getSingleOrder(data.order_id).then(prods => {
  //           if (data.success) {
  //             const navigationExtras: NavigationExtras = {
  //               state: {
  //                 message: data.message,
  //                 products: prods,
  //                 orderId: data.order_id,
  //                 total: this.cartDataClient.total
  //               }
  //             };
  //             this.spinner.hide().then();
  //             this.router.navigate(['/thankyou'], navigationExtras).then(p => {
  //               this.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
  //               this.cartTotal$.next(0);
  //               localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
  //             });
  //           }
  //         });

  //       })
  //     } else {
  //       this.spinner.hide().then();
  //       this.router.navigateByUrl('/checkout').then();
  //       this.toast.error(`Sorry, failed to book the order`, "Order Status", {
  //         timeOut: 1500,
  //         progressBar: true,
  //         progressAnimation: 'increasing',
  //         positionClass: 'toast-top-right'
  //       })
  //     }
  //   })
  // }

  UpdateCartData(index, increase: Boolean) {
    let data = this.cartDataServer.data[index];
    if (increase) {
      // @ts-ignore
      data.numInCart < data.product.quantity
        ? data.numInCart++
        : data.product.stock;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      this.cartDataObs$.next({ ...this.cartDataServer });
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    } else {
      // @ts-ignore
      data.numInCart--;
      // @ts-ignore
      if (data.numInCart < 1) {
        this.DeleteProductFromCart(index);
        this.cartDataObs$.next({ ...this.cartDataServer });
      } else {
        // @ts-ignore
        this.cartDataObs$.next({ ...this.cartDataServer });
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }
}
interface OrderConfirmationResponse {
  order_id: Number;
  success: Boolean;
  message: String;
  products: [
    {
      _id: String;
      numInCart: String;
    }
  ];
}
