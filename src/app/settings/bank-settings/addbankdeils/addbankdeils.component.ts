import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-addbankdeils',
  templateUrl: './addbankdeils.component.html',
  styleUrls: ['./addbankdeils.component.scss']
})
export class AddbankdeilsComponent {

  constructor(private _dialogRef:MatDialogRef<AddbankdeilsComponent>){}

  onYesClick():void{
    this._dialogRef.close(true);

  }

  onClick():void{
    this._dialogRef.close(false);
  }
}

