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

  constructor(private _fb:FormBuilder,
     private _dataService:ClientServiceService,
     private _formBuilder:FormBuilder,
     private _snackBar:MatSnackBar,
     private _http:HttpClient,
     private _clientService:ClientService,
     private _dialogRef:DialogRef<AddClientComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any

    ){
    this.clientForm = this._fb.group({
      contact_name: '',
      email:'',
      author:'',
      mobile:'',
      type:'',
      date:''
    }); 
  }


  onSubmit(){

    //FOR TESTING PURPOSES ONLY
    if(this.clientForm.valid){

      if(this.data){

        this._clientService.updateClient(this.data.id,this.clientForm.value).subscribe({
          next:(val:any)=>{
           this._snackBar.open('Client details edited successfully','OK');
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
    else{
      this._snackBar.open('An error has occured!!','Ok');
    }
  }

  //all methods for validations
  get contactName(){
    return this.clientForm.get('contact_name');
  }

  get email(){
    return this.clientForm.get('email');
  }

  get mobile(){
    return this.clientForm.get('mobile');
  }

  get type(){
    return this.clientForm.get('type');
  }

  get author(){
    return this.clientForm.get('author');
  }

  get date(){
    return this.clientForm.get('date');
  }

}
