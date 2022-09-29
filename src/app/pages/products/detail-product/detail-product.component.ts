import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ProductI } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  product: ProductI;
  subs: Subscription = new Subscription();

  basePath;
  heroForm: FormGroup;
  priceWithQoute:any;
  // months = [
  //   {quantity:"3", month:'3 meses'},
  //   {quantity:"6", month:'6 meses'},
  //   {quantity:"12", month:'12 meses'},
  // ]

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.basePath = window.location.host.includes('localhost') ? '' : '/ng-select';
        this.heroForm = this.formBuilder.group({
            quantity: '3',
        });

    this.configDetailsProduct();
    this.subs.add(
      this.router.events
        .pipe(filter((ev) => ev instanceof NavigationEnd))
        .subscribe({
          next: (res) => {
            this.configDetailsProduct();
            this.changeDetectorRef.detectChanges();
          },
        })
    );

    const price = (this.product.price/3).toFixed(2)
    this.priceWithQoute = Number(price)
    // console.log(typeof())

    this.heroForm.valueChanges.subscribe(x =>
      {
        const price = (this.product.price/(x.quantity*1)).toFixed(2);
        this.priceWithQoute = Number(price)
      }
      )

  }

  configDetailsProduct() {
    // this.productsRelated = [];
    this.product =
      this.activatedRoute.snapshot.data['detailProduct']['product'];
    // setTimeout(() => {
    //   this.productsRelated =
    //     this.activatedRoute.snapshot.data['detailProduct']['productsRelated'];
    // }, 300);

    // this.productSelected = { ...this.product };
    // this.valueSlide = this.product.discountTable[0]?.quantity;
    // this.maxQuantity = this.product.discountTable.length;
    // this.initialValueQuantity = this.product.discountTable[0]?.quantity;
    // this.options.minLimit = this.initialValueQuantity;
    // this.options.maxLimit = this.stock;
    // this.discount = this.product.discountTable[0]?.discountRange;
    // this.options.ceil = this.stock;
    // this.separeImages();

    // this.activatedRoute.snapshot.data['title'] = this.product.name;
    // this.title.setTitle(this.product.name);
    // this.ngDynamicBreadcrumbService.updateBreadcrumbLabels({
    //   nameProduct: this.product.name,
    // });
  }

  setCurrentGalleryItem(id:string,idThumblist:string){
    const galleryItemClicked = document.getElementById(id);
    const galleryThumblistClicked = document.getElementById(idThumblist);

    // Resteamos todos las imagenes grandes activas
    const galleryItems = document.querySelectorAll('.product-gallery-preview-item.active');
    galleryItems.forEach((galleryItem)=>galleryItem.classList.remove('active'));

    galleryItemClicked.classList.add('active');

    // Reseteamos todas las imagenes pequeñas activas
    const galleryItemsThumblists = document.querySelectorAll('.product-gallery-thumblist-item');
    galleryItemsThumblists.forEach((galleryItemsThumblist)=>galleryItemsThumblist.classList.remove('active'));

    galleryThumblistClicked.classList.add('active');

  }
}
