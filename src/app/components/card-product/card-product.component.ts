import { Component, Input, OnInit } from '@angular/core';
import { ProductI } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styles: [
  ]
})
export class CardProductComponent implements OnInit {

  @Input() Product:ProductI;

  constructor() { }

  ngOnInit(): void {
  }

}
