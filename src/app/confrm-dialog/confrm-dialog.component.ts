import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confrm-dialog',
  templateUrl: './confrm-dialog.component.html',
  styleUrls: ['./confrm-dialog.component.scss']
})
export class ConfrmDialogComponent {

  //dependency injection
  constructor(private _dialogRef:MatDialogRef<ConfrmDialogComponent>){}

  onClick():void{
    this._dialogRef.close(false);
  }

  onYesClick():void{
    this._dialogRef.close(true);
  }
}
