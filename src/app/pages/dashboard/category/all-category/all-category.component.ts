import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { CategoryI } from 'src/app/interfaces/category.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.scss']
})
export class AllCategoryComponent implements OnInit {

  labelStatus: 'true' |'false' | '' = '' ;
  labelStrign: 'description'|'id' | 'name' = 'name';

  displayedColumns: string[] = ['id', 'name', 'photo', 'description', 'status','opciones'];
  dataSource = new MatTableDataSource([]);

  categories: CategoryI[]
  category: CategoryI
  
  search:string = '';
  status:string = 'true'
 
  filterForm: FormGroup

  constructor(private categoryService: CategoryService,
    private alertsService: AlertsService,
    private ngxSpinnerService: NgxSpinnerService,
    private formBuilder:FormBuilder,
    )  { }

  ngOnInit(): void {
    this.createForm();
    // this.getCategories()
  }

  createForm(){
    this.filterForm = this.formBuilder.group({
      _id:[''],
      name:[''],
      description:[''],
      status:[''],
    });

    this.getCategories()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCategories(){
    // console.log(this.filterForm.value)
    this.filterForm.value.status = this.labelStatus
    let data = this.filterForm.value
    this.category = {
      _id: data._id ,
      name:data.name,
      description: data.description,
      status: data.status
    }
    console.log(this.category)
    this.categoryService.filterCategories(this.category).subscribe({
      next:(res:any)=>{
       this.categories = res
       this.dataSource = new MatTableDataSource(this.categories);
       console.log(this.categories)
      },
      error: (error) => console.log(error)
    })
  }
  
async changeStatusCategory(idCategory:string,currentStatus:boolean){
  const {result}  = await this.alertsService.confirmDialogWithModals('Info.',`¿Deseas ${currentStatus?'desactivar':'activar'} esta categoría?`,'warning');
  if(result.isConfirmed){
    // console.log(idCategory)
      await this.ngxSpinnerService.show('generalSpinner');
    console.log(!currentStatus)
    console.log(idCategory)
    this.categoryService.changeStatus(idCategory, !currentStatus).pipe(
      finalize(async()=>await this.ngxSpinnerService.hide('generalSpinner'))
    ).subscribe({
      next:(res:any)=>{
        this.getCategories();
      },
      error:(e)=>{
        this.alertsService.toastMixin(e['error']['message'],'error');
      }
    });
  }
}

limpiarForm(){
   this.filterForm.patchValue({
    _id: '',
    name: '',
    description: '',
    status: '',
  });
}

resetFilter(){
 this.limpiarForm()
  this.labelStatus = '';
  this.labelStrign = 'name'
  this.getCategories()
}

}
