import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  disableSelect = new FormControl(false);//cannnot recall why this is here!!!

  public loginForm!:FormGroup;

  constructor(private _router:Router,private _formBuilder:FormBuilder,
    private _http:HttpClient,private _snackBar:MatSnackBar){}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email:['',Validators.required,Validators.email],//TODO: Fix email verification
      password:['',Validators.required]
    })
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  
  navigateToRegisterPage():void{
    this._router.navigateByUrl('/register-page');
  }

 
  navigateToForgotPassword():void{
    this._router.navigateByUrl('/forgot-password');
  }

  private showSnackBar(message:string){
    this._snackBar.open(message,'Ok',{
      duration:3000,
      horizontalPosition:'center',
      verticalPosition:'top',
    })
  }

  login(){
   
    this._http.get<any>(" http://localhost:3000/registerd_users")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      });
      if(user){
        localStorage.setItem('user','currentUser');
        this.loginForm.reset();
        this._router.navigateByUrl('/dashboard');
      
        this.showSnackBar('Login Successful!');
      }else {
     
        this.showSnackBar('Enter your correct login credentials to log in');
      }
    },err=>{
     
      this.showSnackBar('Opps! Something went wrong');
    }
    )
  }
}
