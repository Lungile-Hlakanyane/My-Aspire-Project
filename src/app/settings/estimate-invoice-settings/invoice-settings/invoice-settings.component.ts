import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from 'src/app/confrm-dialog/confrm-dialog.component';


@Component({
  selector: 'app-invoice-settings',
  templateUrl: './invoice-settings.component.html',
  styleUrls: ['./invoice-settings.component.scss']
})
export class InvoiceSettingsComponent {


  constructor(private _router:Router,private _dialog:MatDialog){}



  navigateToLeadPage():void{}
  navigateToDashboard():void{}
  navigateToInvoicePage():void{}
  navigateToSettingsPage():void{}


  showEstimateInvoiceOptions:boolean =false;

  toggleEstimateInvoice(){
    this.showEstimateInvoiceOptions =!this.showEstimateInvoiceOptions;
  }

  openDialog():void{
    const dialolRef = this._dialog.open(ConfrmDialogComponent);

    dialolRef.afterClosed().subscribe((result)=>{
      if(result){
        this._router.navigateByUrl('/login');
      }
    })



  }

}
