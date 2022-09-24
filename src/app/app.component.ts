import { Component, OnInit } from '@angular/core';
import { AuthService } from './modals/auth-modal/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'marketbuy-front';

  constructor(
    private authService: AuthService
  ){
    
  }

  ngOnInit(): void {
    console.log('+++++++++++++')
    this.authService.load();
  }
  
}
