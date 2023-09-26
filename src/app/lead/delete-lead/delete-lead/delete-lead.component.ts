import { Component,OnInit,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-lead',
  templateUrl: './delete-lead.component.html',
  styleUrls: ['./delete-lead.component.scss']
})
export class DeleteLeadComponent implements OnInit{

  leads:any[]=[];

  constructor(
    private _http:HttpClient,
    private _snackBar:MatSnackBar,
    private _dialogRef:MatDialogRef<DeleteLeadComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
    ){}

    ngOnInit(): void {
      this._http.get<any[]>('http://localhost:3000/leads').subscribe(data=>{
        this.leads = data;
      })
    }

    onCancelClick():void{
      this._dialogRef.close();
    }

  deleteLead():void{
    const url = `http://localhost:3000/leads/${this.data.leadId}`;

    this._http.delete(url).subscribe(()=>{
      this._dialogRef.close('deleted');
      this._snackBar.open('Lead succesfully deleted','Close',{
        duration:3000,
        panelClass:['success-snackbar']
      });
    },
    (error)=>{
      this._snackBar.open('Error deleting lead','Close',{
        duration:3000,
        panelClass:['error-snackbar']
      })
    }
   )
  }

}
