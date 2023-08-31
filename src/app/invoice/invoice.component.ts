import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from '../confrm-dialog/confrm-dialog.component';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {

  constructor(private _router:Router,private _dialog:MatDialog){}

  navigateToLeadPage():void{
    this._router.navigateByUrl('lead');
  }

  navigateToInvoicePage():void{
    this._router.navigateByUrl('/invoice');
  }

  navigateToSettingsPage():void{
    this._router.navigateByUrl('/settings');
  }

  openAddInvoicePage():void{
    this._router.navigateByUrl('/add-invoice');
  }

  openDialog():void{
    const dialogRef = this._dialog.open(ConfrmDialogComponent);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this._router.navigateByUrl('/login');
      }
    })
  };
}
