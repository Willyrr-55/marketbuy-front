import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { BrandI } from 'src/app/interfaces/brand.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { BrandService } from 'src/app/services/brand.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-brand',
  templateUrl: './new-brand.component.html',
  styleUrls: ['./new-brand.component.scss']
})
export class NewBrandComponent implements OnInit {

  labelPosition: 'false' | 'true' = 'true';
    

  brandForm:FormGroup;
  formSubmited:boolean = false;

  photo:File[]=[];
  previsualizacionImgUpdate: string

  brandToEdit:BrandI;
  dimensiones:any={
    maxWidth:2500,
    minWidth:200,
    maxHeigth:2500,
    minHeigth:200
  }


  constructor(
    private formBuilder:FormBuilder,
    private alertsService: AlertsService,
    private brandService: BrandService,
    private router: Router,
    private ngxSpinnerService: NgxSpinnerService,
    private changes:ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.brandToEdit = history.state?.element;
    if(this.brandToEdit){
      this.setEditBrand();
    }
  }

  getErrorMessageName(){
    const name = this.brandForm.get('name');

    if(name.hasError('required')){
      return 'El nombre es requerido';
    }

    return ''
  }

  getErrorMessageDescription(){
    const description = this.brandForm.get('description');

    if(description.hasError('required')){
      return 'La descripción es requerida';
    }

    return ''
  }

  getErrorMessageStatus(){
    const status = this.brandForm.get('status');

    if(status.hasError('required')){
      return 'El estado es necesario';
    }

    return ''
  }

  createForm(){
    this.brandForm = this.formBuilder.group({
      _id:[null,[Validators.required]],
      name:['',[Validators.required]],
      description:['',Validators.required],
      status:[true,[Validators.required]]
    });

    this.brandForm.get('_id').disable();
  }

  async registerBrand(){
    this.formSubmited =true;

    if(this.photo.length==0){
      this.alertsService.toastMixin('La imagen de la marca es requerida', 'error');
      return;
    }

    if(this.brandForm.invalid){
      return;
    }

    const brandData = new FormData();
    const data = this.brandForm.value;

    brandData.append('name',data.name);
    brandData.append('description',data.description);
    brandData.append('status',data.status);
    brandData.append('files',this.photo[0]);

    console.log(this.brandForm.value)
    console.log(this.photo)
    await this.ngxSpinnerService.show('generalSpinner');
    this.brandService.registerBrand(brandData).pipe(
      finalize(async()=>await this.ngxSpinnerService.hide('generalSpinner'))
    ).subscribe({
      next:(res:any)=>{
        this.alertsService.toastMixin(res.message,'success');
        this.brandForm.reset();
        this.photo = []
        this.formSubmited=false;
        this.router.navigate(['/dashboard/brands/all-brands'],{replaceUrl:true})
      },
      error:(e:any)=>{
        this.alertsService.toastMixin(e.error.message,'error');
      }
    })
  }


  async editBrand(){
    this.formSubmited = true;
    if(this.brandForm.valid){

      const data = this.brandForm.value;
      console.log(this.brandForm.value)
      data.status = this.brandToEdit.status
      console.log(data.status)
      this.brandToEdit = {
        _id: this.brandToEdit._id,
        name: data.name,
        description: data.description,
        status: data.status
      }

      await this.ngxSpinnerService.show('generalSpinner');
      this.brandService.editBrand(this.brandToEdit).pipe(
        finalize(async()=>await this.ngxSpinnerService.hide('generalSpinner'))
      ).subscribe({
        next:(res)=>{
          this.alertsService.toastMixin(res['message'],'success');
          this.brandForm.reset();
          this.formSubmited = false;
          this.router.navigate(['/dashboard/brands/all-brands'],{replaceUrl:true})
        },
        error:(e)=>{
          this.alertsService.toastMixin(e['error']['message'],'error');
        }
      });
    }
  }

  setEditBrand(){
    this.brandForm.get('_id').enable();
    this.brandForm.get('status').disable();

    this.brandForm.patchValue(this.brandToEdit);
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

        const {result} = await this.alertsService.confirmDialogWithModals('Info.','¿Desea actualizar la imagen de la marca?','question');

      if(result.isConfirmed){

        await this.ngxSpinnerService.show('generalSpinner');

        const formData = new FormData();
        formData.append('files',file);

        this.brandService.uploadPhoto(this.brandToEdit._id,formData).pipe(
          finalize(async()=>{
            await this.ngxSpinnerService.hide('generalSpinner');
          })
        ).subscribe({
          next:(res:any)=>{
            console.log(res.photo)
            this.brandToEdit.photo[0] = res.photo;
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

