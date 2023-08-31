import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.scss']
})
export class AddLeadComponent {

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

  constructor(private _router:Router,){}

  openFileInput():void{
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput.click();
  }

  handleImageUpload(event:any):void{
    const selectedFile = event.target.files[0];
    if(selectedFile){
      console.log('Selected File: ',selectedFile);
    }
  }
}
