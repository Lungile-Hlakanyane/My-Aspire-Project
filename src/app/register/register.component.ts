import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';//imported router class
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!:FormGroup;

  constructor(
    private http:HttpClient,private _formBuilder:FormBuilder,
    private _router:Router,private _snackBar:MatSnackBar
    ){}
  
ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.required,Validators.email],
      password:['',Validators.required,]

    })
}
  
  navigateToLogin():void{
    this._router.navigateByUrl('/login');
  }

  get name(){
    return this.registerForm.get('name');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){{
    return this.registerForm.get('password');
  }}

  private showSnackBar(message:string){
    this._snackBar.open(message,'OK',{
      duration:3000,
      horizontalPosition:'center',
      verticalPosition:'top',
    })
  }

  register(){
    this.http.post<any>("http://localhost:3000/registerd_users",this.registerForm.value)
    .subscribe(res=>{
      this.showSnackBar('Registered Successfully')
      this.registerForm.reset();
      this.navigateToLogin();
    },err=>{
      this.showSnackBar('Something went wrong!!')
    })
 }
}
