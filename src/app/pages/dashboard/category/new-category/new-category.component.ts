import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CategoryI } from 'src/app/interfaces/category.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { CategoryService } from 'src/app/services/category.service';

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
  category:CategoryI;
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
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
    categoryData.append('photo',this.photo[0]);
    console.log(this.categoryForm.value)
    console.log(this.photo)
    this.categoryService.registerCategory(categoryData).subscribe({
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

  editCategory(){

  }

  


}
