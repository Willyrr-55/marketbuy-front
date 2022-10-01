import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import {
  ICreateOrderRequest,
  IPayPalConfig,
  NgxPayPalModule,
} from 'ngx-paypal';
import { SelectMunicipalityComponent } from 'src/app/components/select-municipality/select-municipality.component';
import { CartModelServer } from 'src/app/interfaces/cart.interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  @ViewChild(SelectMunicipalityComponent) selectMunicipalityComponent:SelectMunicipalityComponent;

  departmentSelected: string;
  municipalitySelected: string;

  cartData: CartModelServer;
  cartTotal: Number;

  productosInCar = [];

  isLoading: boolean = false;

  private cartDataServer: CartModelServer = {
    data: [
      {
        product: undefined,
        numInCart: 0,
      },
    ],
    total: 0,
  };

  @ViewChild('stepper') stepper: MatStepper;
  firstFormGroup = this._formBuilder.group({
    names: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    department: ['', Validators.required],
    municipality: ['', Validators.required],
    aditional_info: ['', Validators.required],
    card_number: ['4444444444444444'],
    expiration_date: ['06/22'],
    cvv: ['344'],
  });

  data: any;

  isLinear = false;

  showSuccess: any;
  public payPalConfig?: IPayPalConfig;
  constructor(
    private _formBuilder: FormBuilder,
    public cartService: CartService,
    private productService: ProductService,
    private SharedService: SharedService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.initConfig();

    this.cartService.cartTotal$.subscribe((total) => (this.cartTotal = total));
    this.cartService.cartDataObs$.subscribe((data) => {
      this.cartData = data;
      console.log(data);
      this.data = data;
    });
  }

  filterMunicipalities(department: any) {
    this.changeDetectorRef.detectChanges();
    this.firstFormGroup.get('department').setValue(department.name);
    this.selectMunicipalityComponent.filter(department);
    // return ;
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'AZp6h5TcfAnHd3f-wOysaG7oOcUWZLgYC4MIEnVQ_CvQafE91a_lzbCGSS7G5XoMBfkNE0xXJpMT_CKe',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: '9.99',
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: '9.99',
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: '9.99',
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details) => {
          console.log('aqiuasdasdasd')
          this.registerOrder();
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
  saveData() {
    console.log(this.firstFormGroup.value);
    this.SharedService.infoOrder.next({ ...this.firstFormGroup.value });
    this.stepper.next();
  }

  registerOrder() {
    this.data.data.forEach((element) => {
      var newProduct = {
        quantity: element.numInCart,
        idProduct: element.product._id,
      };
      this.productosInCar.push(newProduct);
    });

    console.log({...this.SharedService.infoOrder, products: this.productosInCar})
    const data = {...this.SharedService.infoOrder, products: this.productosInCar};

    const object = {...this.SharedService.infoOrder, products: this.productosInCar}
    const value = {...object['_value']}
    console.log(value)
    console.log(object)

    this.productService.registerorder({...this.SharedService.infoOrder, products: this.productosInCar}).subscribe(
      {next:(res:any)=>{

      },
      error:(e)=>{
        this.stepper.next();
       console.log(e)
      }
    }
    )

  }

}
