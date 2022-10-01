import { filter, finalize, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  loading:boolean = true;

  subs:Subscription = new Subscription();
  
  search:string;

  products:any[]=[];

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.routeChange();
    this.getProducts();
  }

  getProducts(){
    // Aqui verificamos si está en la ruta de productos nuevos para agregar en los filtros las fechas
    this.loading = true;
    this.search = this.activatedRoute.snapshot.paramMap.get('search');
    this.productService.searchProducts({name:this.search}).pipe(
      finalize(async()=>{
        this.loading = false;
      })
    ).subscribe({
      next:(res:any)=>{
        this.products = res;
      }
    });
  }

  configSearch(){
    this.search = this.activatedRoute.snapshot.paramMap.get('search');
    this.activatedRoute.snapshot.data['title'] = `"${this.search}"`;
  }

  routeChange(){
    this.subs.add(
      this.router.events.pipe(
        filter((ev)=>ev instanceof NavigationEnd)
      ).subscribe({
        next:(ev)=>{
          // Evalua si esta en la ruta de listar productos por medio del searchbar para así actualizar el titulo y el breadcrub sin que se bugee
          if(this.router.url.includes('products/list')){
            this.configSearch();
          }
          this.getProducts();
        }
      })
    );
  }
}
