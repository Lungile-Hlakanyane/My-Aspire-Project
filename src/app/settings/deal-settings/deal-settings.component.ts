import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from 'src/app/confrm-dialog/confrm-dialog.component';

@Component({
  selector: 'app-deal-settings',
  templateUrl: './deal-settings.component.html',
  styleUrls: ['./deal-settings.component.scss']
})
export class DealSettingsComponent {

  constructor(private _router:Router,private _dialog:MatDialog){}

  showEstimateInvoiceOptions:boolean =false;

   toggleEstimateInvoice(){
    this.showEstimateInvoiceOptions =!this.showEstimateInvoiceOptions;
  }



  navigateToDashboard():void{
   this._router.navigateByUrl('dashboard');
  }

  navigateToLeadPage():void{
    this._router.navigateByUrl('/lead');
  }

  navigateToInvoicePage():void{
    this._router.navigateByUrl('/invoice');
  }

  navigateToSettingsPage():void{
    this._router.navigateByUrl('/settings');
  }

  openDialog():void{
    const dialogRef = this._dialog.open(ConfrmDialogComponent);

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this._router.navigateByUrl('/login');
      }
    })

  }

 
 
}
