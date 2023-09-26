import { Component,OnInit,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-invoice',
  templateUrl: './delete-invoice.component.html',
  styleUrls: ['./delete-invoice.component.scss']
})
export class DeleteInvoiceComponent implements OnInit{

  invoices:any[]=[];

  constructor(
    private _http:HttpClient,
    private _snackBar:MatSnackBar,
    private _dialogRef:MatDialogRef<DeleteInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
    ){}

    ngOnInit(): void {
      // fetch all invoices from the json
      this._http.get<any[]>('http://localhost:3000/invoices').subscribe(data=>{
        this.invoices = data;
      })
    }

    onCancelClick():void{
      this._dialogRef.close();
    }

    deleteInvoice():void{
      const url = `http://localhost:3000/invoices/${this.data.invoiceId}`;

      this._http.delete(url).subscribe(()=>{
        this._dialogRef.close('deleted');
        this._snackBar.open('Invoice Deleted Successfully','Ok',{
          duration:3000,
          panelClass:['success-snackbar']
        });
      },
      (error)=>{
        this._snackBar.open('Error deleting invoice','Close',{
          duration:300,
          panelClass:['error-snackbar']
        })
      }

      )
    }
}
