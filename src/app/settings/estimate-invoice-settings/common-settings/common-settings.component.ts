import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from 'src/app/confrm-dialog/confrm-dialog.component';

@Component({
  selector: 'app-common-settings',
  templateUrl: './common-settings.component.html',
  styleUrls: ['./common-settings.component.scss']
})
export class CommonSettingsComponent {
  constructor(private _router:Router,private _dialog:MatDialog){}

  openDialog():void{
    const dialogRef = this._dialog.open(ConfrmDialogComponent);
  }

  
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
    this._router.navigateByUrl('invoice');
  }

  navigateToSettingsPage():void{
    this._router.navigateByUrl('/settings');
  }
}
