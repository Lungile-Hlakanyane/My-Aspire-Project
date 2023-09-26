import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
@Component({
  selector: 'app-lead-info',
  templateUrl: './lead-info.component.html',
  styleUrls: ['./lead-info.component.scss']
})
export class LeadInfoComponent {
  constructor(
    private _http:HttpClient,
    private _dialogRef:MatDialogRef<LeadInfoComponent>
    ){}

    onCancelClick():void{
      this._dialogRef.close();
    }

}
