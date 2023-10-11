import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { LeadService } from '../service/lead.service';


@Component({
  selector: 'app-lead-info',
  templateUrl: './lead-info.component.html',
  styleUrls: ['./lead-info.component.scss']
})
export class LeadInfoComponent implements OnInit {

  leads:any[] =[];

  constructor(
    private _leadService:LeadService,
    private _http:HttpClient,
    private _dialogRef:MatDialogRef<LeadInfoComponent>
    ){}

    ngOnInit(): void {
      this._leadService.getAllLeads().subscribe((data:any)=>{
        this.leads = data;
      })
    }

    onCancelClick():void{
      this._dialogRef.close();
    }

}
