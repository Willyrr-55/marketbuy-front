import { Component, OnInit } from '@angular/core';
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

  displayedColumns: string[] = ['id', 'name', 'photo', 'description', 'status','opciones'];
  dataSource = new MatTableDataSource([]);

  brands: BrandI[]
 
  constructor(private brandService: BrandService,
    private alertsService: AlertsService,
    private ngxSpinnerService: NgxSpinnerService
    )  { }

  ngOnInit(): void {
    this.getBrands()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getBrands(){

    this.brandService.getBrands().subscribe({
      next:(res:any)=>{
       this.brands = res
       this.dataSource = new MatTableDataSource(this.brands);
       console.log(this.brands)
      }
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

}
