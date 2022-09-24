import { Component, OnInit } from '@angular/core';
import { AuthModalComponent } from 'src/app/modals/auth-modal/auth-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../modals/auth-modal/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserI } from 'src/app/modals/auth-modal/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: UserI

  constructor(
    private matDialog: MatDialog,
    public authService: AuthService,
    private jwtHelperService: JwtHelperService,
  ) { }

  ngOnInit(): void {
    let token = this.authService.getToken()
    if(token){
      let tokenDecode = this.jwtHelperService.decodeToken(token)
      this.user = tokenDecode.user
      console.log(tokenDecode)
      console.log('-----------------')
    }    
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  authModal() {
    const dialogRef = this.matDialog.open(AuthModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  cerrarSecion(){
    this.authService.logout()
  }

}
