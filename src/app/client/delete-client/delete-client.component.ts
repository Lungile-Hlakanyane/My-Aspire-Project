import { Component, OnInit,Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.scss']
})
export class DeleteClientComponent implements OnInit {

  clients:any[]=[];

  constructor(
    private _http:HttpClient,
    private _snackBar:MatSnackBar,
    private _dialogRef:MatDialogRef<DeleteClientComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
    ){}

  ngOnInit(): void {
      //fetch all the data from the API
      this._http.get<any[]>('http://localhost:3000/clients').subscribe(data=>{
          this.clients = data;
      });
  }
  

  deleteClient(): void {
    const url = `http://localhost:3000/clients/${this.data.clientId}`;

    this._http.delete(url).subscribe(
      () => {
        this._dialogRef.close('deleted');
        this._snackBar.open('Client successfully deleted', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      (error) => {
        console.error('Error deleting client:', error);
        this._snackBar.open('Error deleting client', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }
}
