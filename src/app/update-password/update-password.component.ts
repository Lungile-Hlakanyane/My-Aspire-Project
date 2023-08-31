import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  disableSelect = new FormControl(false);
  public updateForm!:FormGroup;

  constructor(private _http:HttpClient,private _router:
  Router,private _formBuilder:FormBuilder){}


  ngOnInit(): void {
    this.updateForm = this._formBuilder.group({
      newPassword:['',Validators.required],
      confirmPassword:['',Validators.required]
    })
      
  }

  get newPassword(){
    return this.updateForm.get('newPassword');
  }

  get confirmPassword(){
    return this.updateForm.get('confirmPassword');
  }

  navigateToLogin():void{
    this._router.navigateByUrl('/login');
  }

  updatePassword(){

    //logic here to update password,
    //TODO: Reset password logic
    //TODO: Display message to show the password been successfully registered
    //TODO: then call the navigaive to login method to login page
    this.navigateToLogin();
  }
}
