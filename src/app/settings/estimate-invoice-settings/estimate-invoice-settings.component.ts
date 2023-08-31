import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from 'src/app/confrm-dialog/confrm-dialog.component';

@Component({
  selector: 'app-estimate-invoice-settings',
  templateUrl: './estimate-invoice-settings.component.html',
  styleUrls: ['./estimate-invoice-settings.component.scss']
})
export class EstimateInvoiceSettingsComponent {
  
  toggleValue: boolean = false;

  showEstimateInvoiceOptions:boolean =false;


  onToggleChange(event: any) {
    this.toggleValue = event.checked;
  }

  toggleEstimateInvoice(){
    this.showEstimateInvoiceOptions =!this.showEstimateInvoiceOptions;
  }

  constructor(private _router:Router,private _dialog:MatDialog){}

  navigateToDashboard():void{
    this._router.navigateByUrl('dashboard');
  }
  navigateToLeadPage():void{
    this._router.navigateByUrl('lead');
  }
  navigateToInvoicePage():void{
    this._router.navigateByUrl('invoice');
  }
  navigateToSettingsPage():void{
    this._router.navigateByUrl('settings');
  }
  openDialog():void{
    const dialolRef = this._dialog.open(ConfrmDialogComponent);

    dialolRef.afterClosed().subscribe((result)=>{
      if(result){
        this._router.navigateByUrl('login');
      }

    })
  }

}
