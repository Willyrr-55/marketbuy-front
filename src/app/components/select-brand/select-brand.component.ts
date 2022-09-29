import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BrandI } from 'src/app/interfaces/brand.interface';
import { NgSelectComponent } from '@ng-select/ng-select';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-select-brand',
  templateUrl: './select-brand.component.html',
  styleUrls: ['./select-brand.component.scss']
})
export class SelectBrandComponent implements OnInit {
  @ViewChild(NgSelectComponent) ngSelectComponent:NgSelectComponent
  loading:boolean = false;
  brands: BrandI[]=[];
  search:string;
  searched:boolean =false;
  @Input() brandSelected:string;
  @Input() class:string;
  @Output() changeBrand:EventEmitter<any> = new EventEmitter<any>();

  constructor(private brandsService: BrandService, private change: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getBrands()
  }

  getBrands(){
    this.loading = true
    this.brandsService.getBrands().subscribe({
      next: (res: any) => {
       this.brands = this.brands.concat(res)
        this.loading = false
        this.change.detectChanges()
       console.log(this.brands)
      },
      error: error => console.log(error)
    })
  } 

  selectedStatus(){
    this.changeBrand.emit(this.brandSelected)
  }

}
