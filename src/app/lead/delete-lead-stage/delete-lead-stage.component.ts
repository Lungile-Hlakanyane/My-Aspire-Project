import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddStageService } from '../add-lead-stage/service/add-stage.service';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-delete-lead-stage',
  templateUrl: './delete-lead-stage.component.html',
  styleUrls: ['./delete-lead-stage.component.scss']
})
export class DeleteLeadStageComponent implements OnInit {

  leadStages:any[]=[];

  constructor(
    private _http:HttpClient,
    private _snackBar:MatSnackBar,
    private _dialogRef:MatDialogRef<DeleteLeadStageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {}, 
    private _addLeadStageService:AddStageService,

    ){}

    onCancelClick():void{
      this._dialogRef.close();
    }

    ngOnInit(): void {
      this._http.get<any[]>('http://localhost:3000/stages').subscribe(data=>{
        this.leadStages = data;
      })
    }

    
    
    deleteLeadStage():void{
    const url = `http://localhost:3000/stages/${this.data.leadStageId}`;

    this._http.delete(url).subscribe(()=>{
      this._dialogRef.close('deleted');
      this._snackBar.open('Lead stage succesfully deleted','Close',{
        duration:3000,
        panelClass:['success-snackbar']
      });
    },
    (error)=>{
      this._snackBar.open('Error deleting lead stage','Close',{
        duration:3000,
        panelClass:['error-snackbar']
      })
    }
   )
  }
}
