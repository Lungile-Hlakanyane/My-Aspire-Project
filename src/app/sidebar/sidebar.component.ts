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
    const hiddenRoutes = ['/login', '/register-page', '/forgot-password',];
    

    const secondCurentRoute = this._router.url;
    const otherSecondRoutes = ['/update-password']
  
    return !hiddenRoutes.includes(currentRoute) && !otherSecondRoutes.includes(secondCurentRoute);
    
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
