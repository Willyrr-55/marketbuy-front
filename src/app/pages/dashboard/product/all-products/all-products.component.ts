import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { ProducFilter, ProductI } from 'src/app/interfaces/product.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  Editroducts:ProductI[];

  labelStatus: string = '' ;
  labelStrign: 'id' | 'name' = 'name';
  labelStock: string = ''

  idCategory: string;
  idBrand: string;

  product: ProducFilter

  search:string = '';
  status:string = 'true'
  filterForm: FormGroup

  constructor(
    private productService: ProductService,
    private alertsService: AlertsService,
    private ngxSpinnerService: NgxSpinnerService,
    private formBuilder:FormBuilder,
    private change: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.filterForm = this.formBuilder.group({
      _id:[''],
      name:[''],
      status:[''],
      category:[''],
      brand:[''],
      stock:[''],
    });

    this.getProducts()
  }

  setCategory(idCategory: string) {
    this.filterForm.patchValue({category:idCategory})
    // this.idCategory = idCategory;
    console.log(idCategory)
  }

  setBrand(idBrand: string) {
    console.log(idBrand)
    this.filterForm.patchValue({brand:idBrand})
    // this.idBrand = idBrand;
  }

  getProducts(){
    this.filterForm.value.status = this.labelStatus
    this.filterForm.value.stock = this.labelStock
    let data = this.filterForm.value
    this.product = {
      _id: data._id ,
      name:data.name,
      stock: data.stock,
      status: data.status,
      brand: data.brand,
      category: data.category
    }
    console.log(this.product)
    this.productService.filterProducts(this.product).subscribe({
      next:(res:any)=>{
        this.Editroducts = res;
        console.log(this.Editroducts)
      }
    })
  }

  async changeStatusProduct(product: ProductI){
    const {result}  = await this.alertsService.confirmDialogWithModals('Info.',`¿Deseas ${product.status?'desactivar':'activar'} este producto?`,'warning');
    if(result.isConfirmed){
      // console.log(idCategory)
        await this.ngxSpinnerService.show('generalSpinner');
      console.log(!product.status)
      console.log(product._id)
      this.productService.changeStatus(product._id, !product.status).pipe(
        finalize(async()=>await this.ngxSpinnerService.hide('generalSpinner'))
      ).subscribe({
        next:(res:any)=>{
          this.getProducts();
        },
        error:(e)=>{
          this.alertsService.toastMixin(e['error']['message'],'error');
        }
      });
    }
  }
  
  limpiarForm(){
     this.filterForm.patchValue({
      _id:[''],
      name:[''],
      status:[''],
      category:[''],
      brand:[''],
      stock:[''],
    });
  }
  
  resetFilter(){
    this.limpiarForm()
    this.labelStatus = '';
    this.labelStock = '';
    this.idBrand = '';
    this.idCategory = ''
    this.labelStrign = 'name'
    this.change.detectChanges()
    this.getProducts()
  }
  
}