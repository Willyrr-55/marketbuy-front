import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {

  tabSelected:number = 0

  constructor() { }

  ngOnInit(): void {
  }

  optionSelected(indexTab:number){
    this.tabSelected = indexTab;
  }


}
