import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear:number = new Date().getFullYear();
  windowWidth:number =0;
  changeDetectorRef: any;

  constructor() { }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
  }

  @HostListener('window:resize')
  onResize(){
    this.windowWidth = window.innerWidth;
    this.changeDetectorRef.detectChanges();
  }

}
