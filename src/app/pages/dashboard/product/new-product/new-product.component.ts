import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { ProductI } from 'src/app/interfaces/product.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  labelPosition: 'false' | 'true' = 'true';
    
  productFormcreate: boolean = false
  productForm:FormGroup;
  formSubmited:boolean = false;

  idCategory: string;
  idBrand: string;

  photos:File[]=[];
  previsualizacionImgUpdate: string

  productToEdit: ProductI;
  dimensiones:any={
    maxWidth:2500,
    minWidth:200,
    maxHeigth:2500,
    minHeigth:200
  }


  constructor(
    private formBuilder:FormBuilder,
    private alertsService: AlertsService,
    private productService: ProductService,
    private router: Router,
    private ngxSpinnerService: NgxSpinnerService,
    private changes:ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.productToEdit = history.state?.category;
    if(this.productToEdit){
      this.setEditCategory();
    }
  }

  getErrorMessageName(){
    const name = this.productForm.get('name');

    if(name.hasError('required')){
      return 'El nombre es requerido';
    }

    return ''
  }

  getErrorMessageImgProduct() {

    if (this.photos.length ==0 && !this.productToEdit) {
      return 'El producto debe de tener al menos una imagen'
    }

    return '';
  }

  getErrorMessageDescription(){
    const description = this.productForm.get('description');

    if(description.hasError('required')){
      return 'La descripción es requerida';
    }

    return ''
  }

  getErrorMessageStatus(){
    const status = this.productForm.get('status');

    if(status.hasError('required')){
      return 'El estado es necesario';
    }

    return ''
  }

  createForm(){
    this.productForm = this.formBuilder.group({
      _id:['',[Validators.required]],
      name:['',[Validators.required]],
      description:['',[Validators.required]],
      price:[0,[Validators.required]],
      stock:[0,[Validators.required]],
      category:['',[Validators.required]],
      brand:['',[Validators.required]],
      status:[true,[Validators.required]]
    });
    this.changes.detectChanges()
    console.log('form creado', this.productForm.value)

    this.productForm.get('_id').disable();
    this.productFormcreate = true
  }

  setCategory(idCategory: string) {
    this.productForm.patchValue({category:idCategory})
    // this.idCategory = idCategory;
    console.log(idCategory)
  }

  setBrand(idBrand: string) {
    console.log(idBrand)
    this.productForm.patchValue({brand:idBrand})
    // this.idBrand = idBrand;
  }

  async registerProduct(){
    this.formSubmited =true;
    console.log(this.productForm.value)
    if(this.photos.length==0){
      this.alertsService.toastMixin('La imagen de la marca es requerida', 'error');
      return;
    }

    if(this.productForm.invalid){
      return;
    }

    const productData = new FormData();
    const data = this.productForm.value;

    productData.append('name',data.name);
    productData.append('description',data.description);
    productData.append('status',data.status);
    productData.append('stock',data.stock);
    productData.append('price',data.price);
    productData.append('category',data.category);
    productData.append('brand',data.brand);
    productData.append('files',this.photos[0]);


    await this.ngxSpinnerService.show('generalSpinner');
    this.productService.registerProduct(productData).pipe(
      finalize(async()=>await this.ngxSpinnerService.hide('generalSpinner'))
    ).subscribe({
      next:(res:any)=>{
        this.alertsService.toastMixin(res.message,'success');
        this.productForm.reset();
        this.photos = []
        this.formSubmited=false;
        this.router.navigate(['/dashboard/products/all-products'],{replaceUrl:true})
      },
      error:(e:any)=>{
        this.alertsService.toastMixin(e.error.message,'error');
      }
    })
  }


  async editProduct(){
    this.formSubmited = true;
    if(this.productForm.valid){

      const data = this.productForm.value;
      data.status = this.productToEdit.status

      this.productToEdit = {
        _id: this.productToEdit._id,
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category: data.category,
        brand: data.brand,
        status: data.status
      }

      await this.ngxSpinnerService.show('generalSpinner');
      this.productService.editProduct(this.productToEdit).pipe(
        finalize(async()=>await this.ngxSpinnerService.hide('generalSpinner'))
      ).subscribe({
        next:(res)=>{
          this.alertsService.toastMixin(res['message'],'success');
          this.productForm.reset();
          this.formSubmited = false;
          this.router.navigate(['/dashboard/options/category/all-category'],{replaceUrl:true})
        },
        error:(e)=>{
          this.alertsService.toastMixin(e['error']['message'],'error');
        }
      });
    }
  }

  setEditCategory(){
    this.productForm.get('_id').enable();
    this.productForm.get('status').disable();

    this.productForm.patchValue(this.productToEdit);
  }


  async changePhoto(){
    const { value: file } = await Swal.fire({
      title: 'Seleccione la imagen',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Seleccione la imagen'
      },
      confirmButtonText:'Continuar'
    })

    if (file) {
      const reader = new FileReader()
      reader.onload = async(e) => {
        await Swal.fire({
          title:'Previsualización de la imagen',
          imageUrl:e.target.result.toString(),
          imageAlt:'Previsualización de la imagen',
          confirmButtonText:'Continuar'
        });

        const {result} = await this.alertsService.confirmDialogWithModals('Info.','¿Desea actualizar la imagen de la categoria?','question');

      if(result.isConfirmed){

        await this.ngxSpinnerService.show('generalSpinner');

        const formData = new FormData();
        formData.append('files',file);

        this.productService.uploadPhoto(this.productToEdit._id,formData).pipe(
          finalize(async()=>{
            await this.ngxSpinnerService.hide('generalSpinner');
          })
        ).subscribe({
          next:(res:any)=>{
            this.productToEdit.photos[0] = res.photo;
            this.alertsService.toastMixin(res.message,'success');
          },
          error:(e:any)=>{
            this.alertsService.toastMixin(e.error.message,'error');
          }
        });
      }
      }
      reader.readAsDataURL(file);
    }
  }

}
