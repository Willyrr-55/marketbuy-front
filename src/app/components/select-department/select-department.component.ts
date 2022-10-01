import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-select-department',
  templateUrl: './select-department.component.html',
  styles: [
  ]
})
export class SelectDepartmentComponent implements OnInit {

//     {
//         name:"AHUACHAPÁN",
//     },
//     {
//         name:"CABAÑAS",
//     },
//     {
//         name:"CHALATENANGO",
//     },
//     {
//         name:"CUSCATLÁN",
//     },
//     {
//         name:"MORAZÁN",
//     },
//     {
//         name:"LA LIBERTAD",
//     },
//     {
//         name:"LA PAZ",
//     },
//     {
//         name:"LA UNIÓN",
//     },
//     {
//         name:"SAN MIGUEL",
//     },
//     {
//         name:"SAN SALVADOR",
//     },
//     {
//         name:"SAN VICENTE",
//     },
//     {
//         name:"SANTA ANA",
//     },
//     {
//         name:"SONSONATE",
//     },
//     {
//         name:"USULUTÁN",
//     }

// ];

  @Input()departmentSelected:string='';

  @Input()formGroup:FormGroup;
  @Input()formControlNameDepartment:string;

  @Output() changeDepartment:EventEmitter<string> = new EventEmitter<string>();
  @Output() changeDepartmentObject:EventEmitter<any> = new EventEmitter<any>();

  departments:any[]=[];
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  selectedDepartment(){

    if(this.formGroup){
      this.formGroup.get(this.formControlNameDepartment).setValue(this.departmentSelected);
    }
    const departmentObject = this.departments.find(v=>v.name==this.departmentSelected);
    this.changeDepartmentObject.emit(departmentObject)
    this.changeDepartment.emit(this.departmentSelected);
  }

  getDepartments(){
    this.productService.getDepartmentsComponent().subscribe({
      next:((res:any)=>{
        this.departments = res.departments;
      })
    })
  }

  clear(){
    this.departmentSelected = null;
  }

}
