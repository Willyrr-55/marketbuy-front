import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { CategoryI } from 'src/app/interfaces/category.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  labelPosition: 'false' | 'true' = 'true';
    

  categoryForm:FormGroup;
  formSubmited:boolean = false;

  photo:File[]=[];
  previsualizacionImgUpdate: string

  categoryToEdit:CategoryI;
  dimensiones:any={
    maxWidth:2500,
    minWidth:200,
    maxHeigth:2500,
    minHeigth:200
  }


  constructor(
    private formBuilder:FormBuilder,
    private alertsService: AlertsService,
    private categoryService: CategoryService,
    private router: Router,
    private ngxSpinnerService: NgxSpinnerService,
    private changes:ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.categoryToEdit = history.state?.category;
    if(this.categoryToEdit){
      this.setEditCategory();
    }
  }

  getErrorMessageName(){
    const name = this.categoryForm.get('name');

    if(name.hasError('required')){
      return 'El nombre es requerido';
    }

    return ''
  }

  getErrorMessageDescription(){
    const description = this.categoryForm.get('description');

    if(description.hasError('required')){
      return 'La descripción es requerida';
    }

    return ''
  }

  getErrorMessageStatus(){
    const status = this.categoryForm.get('status');

    if(status.hasError('required')){
      return 'El estado es necesario';
    }

    return ''
  }

  createForm(){
    this.categoryForm = this.formBuilder.group({
      _id:[null,[Validators.required]],
      name:['',[Validators.required]],
      description:['',Validators.required],
      status:[true,[Validators.required]]
    });

    this.categoryForm.get('_id').disable();
  }

  async registerCategory(){
    this.formSubmited =true;

    if(this.photo.length==0){
      this.alertsService.toastMixin('La imagen de la marca es requerida', 'error');
      return;
    }

    if(this.categoryForm.invalid){
      return;
    }

    const categoryData = new FormData();
    const data = this.categoryForm.value;

    categoryData.append('name',data.name);
    categoryData.append('description',data.description);
    categoryData.append('status',data.status);
    categoryData.append('files',this.photo[0]);

    console.log(this.categoryForm.value)
    console.log(this.photo)
    await this.ngxSpinnerService.show('generalSpinner');
    this.categoryService.registerCategory(categoryData).pipe(
      finalize(async()=>await this.ngxSpinnerService.hide('generalSpinner'))
    ).subscribe({
      next:(res:any)=>{
        this.alertsService.toastMixin(res.message,'success');
        this.categoryForm.reset();
        this.photo = []
        this.formSubmited=false;
        this.router.navigate(['/dashboard/category/all-category'],{replaceUrl:true})
      },
      error:(e:any)=>{
        this.alertsService.toastMixin(e.error.message,'error');
      }
    })
  }


  async editCategory(){
    this.formSubmited = true;
    if(this.categoryForm.valid){

      const data = this.categoryForm.value;
      data.status = this.categoryToEdit.status

      this.categoryToEdit = {
        _id: this.categoryToEdit._id,
        name: data.name,
        description: data.description,
        status: data.status
      }

      await this.ngxSpinnerService.show('generalSpinner');
      this.categoryService.editCategory(this.categoryToEdit).pipe(
        finalize(async()=>await this.ngxSpinnerService.hide('generalSpinner'))
      ).subscribe({
        next:(res)=>{
          this.alertsService.toastMixin(res['message'],'success');
          this.categoryForm.reset();
          this.formSubmited = false;
          this.router.navigate(['/dashboard/category/all-category'],{replaceUrl:true})
        },
        error:(e)=>{
          this.alertsService.toastMixin(e['error']['message'],'error');
        }
      });
    }
  }

  setEditCategory(){
    this.categoryForm.get('_id').enable();
    this.categoryForm.get('status').disable();

    this.categoryForm.patchValue(this.categoryToEdit);
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

        this.categoryService.uploadPhoto(this.categoryToEdit._id,formData).pipe(
          finalize(async()=>{
            await this.ngxSpinnerService.hide('generalSpinner');
          })
        ).subscribe({
          next:(res:any)=>{
            this.categoryToEdit.photo[0] = res.photo;
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
