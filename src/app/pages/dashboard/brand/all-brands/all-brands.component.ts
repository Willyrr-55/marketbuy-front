import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { BrandI } from 'src/app/interfaces/brand.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { BrandService } from 'src/app/services/brand.service';


@Component({
  selector: 'app-all-brands',
  templateUrl: './all-brands.component.html',
  styleUrls: ['./all-brands.component.scss']
})
export class AllBrandsComponent implements OnInit {
  
  labelStatus: 'true' |'false' | '' = '' ;
  labelStrign: 'description'|'id' | 'name' = 'name';

  displayedColumns: string[] = ['id', 'name', 'photo', 'description', 'status','opciones'];
  dataSource = new MatTableDataSource([]);

  brands: BrandI[]
  brand: BrandI
  filterForm: FormGroup
 
  constructor(private brandService: BrandService,
    private alertsService: AlertsService,
    private ngxSpinnerService: NgxSpinnerService,
    private formBuilder:FormBuilder,
    )  { }

  ngOnInit(): void {
    this.createForm()
  }
  
  createForm(){
    this.filterForm = this.formBuilder.group({
      _id:[''],
      name:[''],
      description:[''],
      status:[''],
    });

    this.getBrands()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getBrands(){
    this.filterForm.value.status = this.labelStatus
    let data = this.filterForm.value

    this.brand = {
      _id: data._id ,
      name:data.name,
      description: data.description,
      status: data.status
    }
    this.brandService.filterBrands(this.brand).subscribe({
      next:(res:any)=>{
       this.brands = res
       this.dataSource = new MatTableDataSource(this.brands);
       console.log(this.brands)
      },
      error: (error) => console.log(error)
    })

  }
  
async changeStatusBrand(idBrands:string,currentStatus:boolean){
  const {result}  = await this.alertsService.confirmDialogWithModals('Info.',`¿Deseas ${currentStatus?'desactivar':'activar'} esta marca?`,'warning');
  if(result.isConfirmed){
    // console.log(idCategory)
      await this.ngxSpinnerService.show('generalSpinner');
    console.log(!currentStatus)
    console.log(idBrands)
    this.brandService.changeStatus(idBrands, !currentStatus).pipe(
      finalize(async()=>await this.ngxSpinnerService.hide('generalSpinner'))
    ).subscribe({
      next:(res:any)=>{
        this.getBrands();
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
 this.getBrands()
}

}
