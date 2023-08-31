import { Component, OnInit } from '@angular/core';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from '../confrm-dialog/confrm-dialog.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LeadService } from './service/lead.service';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent implements OnInit {

  constructor(
    private _router:Router,
    private _dialog:MatDialog,
    private _leadService:LeadService
    ){}

    ngOnInit(): void {

        
    }

  openAddLeadForm():void{
    const dialogRef = this._dialog.open(AddLeadComponent);
  }

  openDialog():void{
    const dialogRef = this._dialog.open(ConfrmDialogComponent);

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this._router.navigateByUrl('/login');
      }
    })
  }

  navigateToDashboard():void{
    this._router.navigateByUrl('/dashboard');
  }
  
  navigateToSettings():void{
    this._router.navigateByUrl('/settings');
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
