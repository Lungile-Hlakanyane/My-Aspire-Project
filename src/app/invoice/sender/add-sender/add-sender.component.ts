import { Component,Inject,OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SenderService } from '../service/sender.service';
import { HttpClient } from '@angular/common/http';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-sender',
  templateUrl: './add-sender.component.html',
  styleUrls: ['./add-sender.component.scss']
})
export class AddSenderComponent implements OnInit {

  senders:any[]=[];
  senderForm:FormGroup;

  constructor(
    private _snackBar:MatSnackBar,
    private _dialogRef:MatDialogRef<AddSenderComponent>,
    private _fb:FormBuilder,
    private _http:HttpClient,
    private _senderService:SenderService,
    @Inject(MAT_DIALOG_DATA) public data:any
  
    ){
      this.senderForm = this._fb.group({
        contact_name:'',
        email:'',
        physical_address:'',
        mobile:''
      })
    }

    onSubmit():void{
      if(this.senderForm.valid){
        if(this.data){
          this._senderService.updateSender(this.data.id,this.senderForm.value).subscribe({
            next:(val:any)=>{
              this._snackBar.open('Sender Details successfully added','Ok');
              this._dialogRef.close();
            },
            error:(err:any)=>{
              this._snackBar.open('An error occured unable to updated a Sender','OK');
            }
          }
         )
        }else{
          this._senderService.addSender(this.senderForm.value).subscribe({
            next:(val:any)=>{
             this._snackBar.open('Sender added successfully','OK');
              this._dialogRef.close();
            },
            error:(err:any)=>{
              this._snackBar.open('An error occured unable to add a Sender','OK');
            }
          })
        }
      }
      else{
        this._snackBar.open('An error has occured','Ok');
      }
    
    }

  ngOnInit(): void {
    
  }

  closeDialogBox(){
    this._dialogRef.close();
  }
}
