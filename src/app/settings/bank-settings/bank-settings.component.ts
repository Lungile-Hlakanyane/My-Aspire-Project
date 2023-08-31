import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from 'src/app/confrm-dialog/confrm-dialog.component';
import { AddbankdeilsComponent } from './addbankdeils/addbankdeils.component';

@Component({
  selector: 'app-bank-settings',
  templateUrl: './bank-settings.component.html',
  styleUrls: ['./bank-settings.component.scss']
})
export class BankSettingsComponent {
  constructor(private _router:Router,private _dialog:MatDialog){}

  showEstimateInvoiceOptions:boolean =false;

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

  navigateToLeadPage():void{
    this._router.navigateByUrl('/lead');
  }

  navigateToSettingsPage():void{
    this._router.navigateByUrl('/settings');
  }

  navigateToInvoicePage():void{
    this._router.navigateByUrl('/invoice');
  }

  navigateToDashboard():void{
    this._router.navigateByUrl('/dashboard');
  }

  addBankDetails():void{
    const dialogRef = this._dialog.open(AddbankdeilsComponent);
  }
}
