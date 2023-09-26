import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { LeadService } from '../service/lead.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.scss']
})
export class AddLeadComponent implements OnInit{

  leadForm:FormGroup;
  leads:any[]=[];

  countries =[
    {value: 'south africa',viewValue:'South Africa'},
    {value: 'nigeria',viewValue:'Nigeria'},
    {value: 'China',viewValue:'China'},
    {value: 'brazil',viewValue:'Brazil'},
  ]

  regions =[
    {value:'gauteng province',viewValue:'Gauteng Province'},
    {value:'free state province',viewValue:'Free State Province'},
    {value:'western cape province',viewValue:'Kwazulu-Natal Province'},
    {value:'easten cape province',viewValue:'Eastern Cape Province'},
  ]

  currencies =[
    {value:'united states dollar ',viewValue:'United States Dollar(USD)'},
    {value:'Euro',viewValue:'Euro(EUR)'},
    {value:'south african rand',viewValue:'South African Rand (ZAR)'},
  ]

  ngOnInit(): void {
    // fetch leads from json server API
    this.leadForm.patchValue(this.data);
    
    this._http.get<any[]>('http://localhost:3000/leads').subscribe(data=>{
      this.leads = data;

    })
  }

  saveLeadDetails(){
   
      if(this.data){
        this._leadService.updateLead(this.data.id,this.leadForm.value).subscribe({
          next:(val:any)=>{
            this._snackBar.open('Lead details edited successfuly','OK');
            this._dialogRef.close();
          },
          error:(error:any)=>{
            this._snackBar.open('An error occured unable to update lead','Ok');
          }
        })
      }else{
        this._leadService.addLead(this.leadForm.value).subscribe({
          next:(val:any)=>{
            this._snackBar.open('Lead added successfully', 'Ok');
            this._dialogRef.close();
          },
          error:(err:any)=>{
            this._snackBar.open('An error occured unable to add a lead','Ok');
          }
        } 
        )
      }
  }

  constructor(
    private _router:Router,
    private _fb:FormBuilder,
    private _snackBar:MatSnackBar,
    private _leadService:LeadService,
    private _dialogRef:DialogRef<AddLeadComponent>,
    private _http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public data:any
    ){
      this.leadForm = this._fb.group({
        person: ['',Validators.required],
        organization:['',Validators.required],
        email: ['',Validators.required, Validators.email],
        mobile:['',Validators.required,],
        country:['',Validators.required],
        region:['',Validators.required],
        budget:['',Validators.required],
        currency_type:['',Validators.required],
        description:['',],
        note:'',
      })
    }

  openFileInput():void{
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput.click();
  }

  get f (){
    return this.leadForm.controls;
  }


  handleImageUpload(event:any):void{
    const selectedFile = event.target.files[0];
    if(selectedFile){
      console.log('Selected File: ',selectedFile);
    }
  }
}
