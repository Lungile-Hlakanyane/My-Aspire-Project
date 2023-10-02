import { Component, Inject, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ClientServiceService } from '../client-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../service/client.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit{

  clients:any[]=[];

  clientForm:FormGroup;

  ngOnInit(): void {

    this.clientForm.patchValue(this.data);

    // fetch clients from the API
    this._http.get<any[]>('http://localhost:3000/clients').subscribe(data=>{
      this.clients = data;
    })
  }

  constructor(
     private _fb:FormBuilder,
     private _snackBar:MatSnackBar,
     private _http:HttpClient,
     private _clientService:ClientService,
     private _dialogRef:DialogRef<AddClientComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any

    ){
    this.clientForm = this._fb.group({
      contact_name: ['',Validators.required],
      email:['',Validators.required,Validators.email],
      author:['',Validators.required],
      mobile:['',Validators.required],
      type:['',Validators.required],
      date:['',Validators.required]
    }); 
  }

  get f (){
    return this.clientForm.controls;
  }

  onSubmit(){
      if(this.data){

        this._clientService.updateClient(this.data.id,this.clientForm.value).subscribe({
          next:(val:any)=>{
           this._snackBar.open('Client details edited successfully','OK',{
             duration:3000,
             horizontalPosition:'center',
             verticalPosition:'top',
           });
            this._dialogRef.close();
          },
          error:(err:any)=>{
            this._snackBar.open('An error occured unable to updated a client','OK');
          }
        })

      }else{
        this._clientService.addClient(this.clientForm.value).subscribe({
          next:(val:any)=>{
           this._snackBar.open('Client added successfully','OK');
            this._dialogRef.close();
          },
          error:(err:any)=>{
            this._snackBar.open('An error occured unable to add a client','OK');
          }
        })
      }
  }

}
