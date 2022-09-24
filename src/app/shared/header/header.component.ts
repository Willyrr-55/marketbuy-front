import { Component, OnInit } from '@angular/core';
import { AuthModalComponent } from 'src/app/modals/auth-modal/auth-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../modals/auth-modal/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private matDialog: MatDialog,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
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

}
