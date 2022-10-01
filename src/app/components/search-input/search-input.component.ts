import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AutocompleteComponent } from 'angular-ng-autocomplete';
import { ProductI } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements AfterViewInit{
  @ViewChild('searchInputComponent',{static:true}) searchInputComponent:AutocompleteComponent;

  @Input()classes:string[]=[];
  @Input()placeholder:string ='';
  keyboard:string = 'name';

  products:ProductI[] =[];

  inputSearch:HTMLElement;

  searchInput:any;

  customFilter = function(products:ProductI[],query:any){
    return products.filter((p)=>p.name.toLowerCase().includes(query?.toLowerCase()))
  };

  constructor(
    private productService: ProductService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngAfterViewInit(){
    this.inputSearch = document.querySelector('.ng-autocomplete .autocomplete-container');
  }

  selected(ev:any){
    if(ev){
      this.inputSearch.classList.add('input-value');
      this.router.navigateByUrl(`/products/details/${ev._id}`);
    }
  }

  search(){
    if(typeof this.searchInput == 'object'){
      this.inputSearch.classList.add('input-value');
      this.router.navigateByUrl(`/products/details/${this.searchInput._id}`);
    }else{
      this.router.navigateByUrl(`/products/list/${this.searchInput}`);
      this.searchInputComponent.close();
    }
  }

  changeValue(value:string){
    if(value.length>0){
      this.getProducts(value);
      return this.inputSearch.classList.add('input-value');
    }
    this.inputSearch.classList.remove('input-value');

  }

  getProducts(search:string){
    this.productService.searchProducts({name:search}).subscribe({
      next:(res:any)=>{
        this.products = res;
        this.changeDetectorRef.detectChanges();
      }
    })
  }
}
