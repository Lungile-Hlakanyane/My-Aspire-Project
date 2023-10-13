import { Component,OnInit,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { LeadService } from '../service/lead.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-lead-info',
  templateUrl: './lead-info.component.html',
  styleUrls: ['./lead-info.component.scss']
})
export class LeadInfoComponent implements OnInit {

  leads:any[] =[];
  lead:any;

  constructor(
    private _leadService:LeadService,
    private _http:HttpClient,
    private _dialogRef:MatDialogRef<LeadInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{lead:any}
    ){
      this.lead = data.lead;
    }

    ngOnInit(): void {
      this._leadService.getAllLeads().subscribe((data:any)=>{
        this.leads = data;
      })
    }

    onCancelClick():void{
      this._dialogRef.close();
    }

}
