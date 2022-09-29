import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { CategoryI } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.scss']
})
export class SelectCategoryComponent implements OnInit {

  @ViewChild(NgSelectComponent) ngSelectComponent:NgSelectComponent
  loading:boolean = false;
  categories: CategoryI[]=[];
  search:string;
  searched:boolean =false;
  @Input() categorySelected:string;
  @Input() class:string;
  @Output() changeCategory:EventEmitter<any> = new EventEmitter<any>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.loading = true
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
            this.categories = this.categories.concat(res)
            this.loading = false
      },
      error: error => console.log(error)
    })
  }

  selectedCategory(){
    this.changeCategory.emit(this.categorySelected)
  }

}
