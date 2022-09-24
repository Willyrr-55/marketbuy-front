import { Component } from '@angular/core';
import { AuthService } from './modals/auth-modal/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'marketbuy-front';

  constructor(
    private authService: AuthService
  ){
    this.authService.load();
  }
}
