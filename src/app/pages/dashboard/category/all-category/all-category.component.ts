import { Component, OnInit } from '@angular/core';
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

  displayedColumns: string[] = ['id', 'name', 'photo', 'description', 'status','opciones'];
  dataSource = new MatTableDataSource([]);

  categories: CategoryI[]
 
  constructor(private categoryService: CategoryService,
    private alertsService: AlertsService,
    private ngxSpinnerService: NgxSpinnerService
    )  { }

  ngOnInit(): void {
    this.getCategories()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCategories(){

    this.categoryService.getCategories().subscribe({
      next:(res:any)=>{
       this.categories = res
       this.dataSource = new MatTableDataSource(this.categories);
       console.log(this.categories)
      }
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

}