import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from '../confrm-dialog/confrm-dialog.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  
  constructor(
    private _authService:AuthService,
    private _router:Router,
    private _dialog:MatDialog
    ){}

  isLoggedIn():boolean{
    return this._authService.isLoggedIn();
  }

  shouldDisplayMenu(): boolean {
    const currentRoute = this._router.url;
    // List of routes where the menu should be hidden
    const hiddenRoutes = ['/login', '/register', '/forgot-password', '/update-password'];
  
    // Check if the current route is not in the hiddenRoutes array
    return !hiddenRoutes.includes(currentRoute);
  }

  openExitDialog():void{
    const dialogRef = this._dialog.open(ConfrmDialogComponent);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this._router.navigateByUrl('/login');
      }
    })
  }

}
