import { Component, Inject, OnInit} from '@angular/core';
import { Dialog, } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-estimate',
  templateUrl: './delete-estimate.component.html',
  styleUrls: ['./delete-estimate.component.scss']
})
export class DeleteEstimateComponent implements OnInit {

  estimates:any[]=[];

  constructor(
    private _dialogRef:MatDialogRef<DeleteEstimateComponent>,
    private _snackBar:MatSnackBar,
    private _http:HttpClient,
    private _dialog:Dialog,
    @Inject(MAT_DIALOG_DATA) private data:any
    ){}

    ngOnInit(): void {

      this._http.get<any[]>('http://localhost:3000/estimates').subscribe(data=>{
        this.estimates = data;
      })
        
    }

  onNoClick():void{
    this._dialogRef.close();
  }

  deleteEstimate():void{
    const url = `http://localhost:3000/estimates/${this.data.estimateId}`;


    this._http.delete(url).subscribe(()=>{
      this._dialogRef.close('Deleted');
      this._snackBar.open('Estimate successfully deleted','Close',{
        duration:3000,
        panelClass:['success-snackbar']
      });
    },
    (error)=>{
      console.log('Error deleting the estimate',error);
      this._snackBar.open('Error deleting the estimate','Close',{
        duration:3000,
        panelClass:['error-snackbar']
      });
    }
  )
  }


  openDeleteEstimateDialog(estimateId:number):void{
    const dialogRef = this._dialog.open(DeleteEstimateComponent,{
      data:{estimateId}
    })
  
  }

}
