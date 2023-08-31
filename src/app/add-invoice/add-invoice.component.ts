import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from '../confrm-dialog/confrm-dialog.component';
import { EditDialogBoxComponent } from '../edit-dialog-box/edit-dialog-box.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent {

  constructor(private _router:Router,private _dialog:MatDialog){}

  openDialog():void{
    const dialogRef = this._dialog.open(ConfrmDialogComponent);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this._router.navigateByUrl('/login');
      }
    })
  }

  openEditDialogBox():void{

    //this must open EditDialogBoxComponent
   this._dialog.open(EditDialogBoxComponent);
  }

  selectReceiver(){
    //logic here
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
}
