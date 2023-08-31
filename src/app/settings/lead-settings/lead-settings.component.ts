import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from 'src/app/confrm-dialog/confrm-dialog.component';


@Component({
  selector: 'app-lead-settings',
  templateUrl: './lead-settings.component.html',
  styleUrls: ['./lead-settings.component.scss']
})
export class LeadSettingsComponent {

  showEstimateInvoiceOptions:boolean =false;

  constructor(private _router:Router,private _dialog:MatDialog){}

  navigateToDashboard():void{
    this._router.navigateByUrl('/dashboard');
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

  toggleEstimateInvoice(){
    this.showEstimateInvoiceOptions =!this.showEstimateInvoiceOptions;
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
