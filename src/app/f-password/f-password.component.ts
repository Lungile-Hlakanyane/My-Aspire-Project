import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-f-password',
  templateUrl: './f-password.component.html',
  styleUrls: ['./f-password.component.scss']
})
export class FPasswordComponent implements OnInit{

  public forgotpasswordForm!:FormGroup;

  constructor(private _router:Router,private _formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.forgotpasswordForm = this._formBuilder.group({
      email:['',Validators.required]
    })
  }

  get email(){
    return this.forgotpasswordForm.get('email');
  }
  

  forgotPassword(){
    //implementation here
  }

  navigateToUpdatePassword():void{
    this._router.navigateByUrl('/update-password');
  }
}
