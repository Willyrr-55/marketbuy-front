import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AutocompleteComponent } from 'angular-ng-autocomplete';
import { ProductI } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInputComponent',{static:true}) searchInputComponent:AutocompleteComponent;

  @Input()classes:string[]=[];
  @Input()placeholder:string ='';

  products:ProductI[] =[];
  inputSearch:HTMLElement;
  keyboard:string = 'name';

  customFilter = function(products: any[], query: string): any[] {
    return products.filter(x => x.name.toLowerCase().includes(query.toLowerCase()) || x.tags.includes(query.toLowerCase()) || x.category.name?.toLowerCase().includes(query.toLowerCase()));
  };

  searchInput:string;

  constructor(
    private router: Router,
    private productService: ProductService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.inputSearch = document.querySelector('.ng-autocomplete .autocomplete-container');
  }

  selected(ev:any){
    if(ev){
      this.inputSearch.classList.add('input-value');
      this.router.navigateByUrl(`/dashboard/products/details/${ev.idProduct}`);
    }
  }

  search(){
    this.router.navigateByUrl(`/dashboard/products/list/${this.searchInput}`);
  }

  changeValue(value:string){
    if(value.length>0){
      this.getProducts(value);
      return this.inputSearch.classList.add('input-value');
    }
    this.inputSearch.classList.remove('input-value');
  }

  getProducts(search:string){
    this.productService.searchProducts(search,[]).subscribe({
      next:(res:any)=>{
        this.products = res.products;
        this.changeDetectorRef.detectChanges();
      }
    })
  }

}
