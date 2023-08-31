import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from 'src/app/confrm-dialog/confrm-dialog.component';

@Component({
  selector: 'app-estimate-settings',
  templateUrl: './estimate-settings.component.html',
  styleUrls: ['./estimate-settings.component.scss']
})
export class EstimateSettingsComponent {

  constructor(private _router:Router,private _dialog:MatDialog){}

  showEstimateInvoiceOptions:boolean =false;

  toggleValue:boolean = false;

  onToggleChange(event:any){
    this.toggleValue = event.checked;
  }

  toggleEstimateInvoice(){
    this.showEstimateInvoiceOptions =!this.showEstimateInvoiceOptions;
  }

  navigateToDashboard():void{
    this._router.navigateByUrl('/dashboard');
  }
  navigateToLeadPage():void{
    this._router.navigateByUrl('/dashboard');
  }
  navigateToInvoicePage():void{
    this._router.navigateByUrl('/dashboard');
  }
  navigateToSettingsPage():void{
    this._router.navigateByUrl('/dashboard');
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
