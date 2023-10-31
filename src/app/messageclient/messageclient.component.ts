import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import emailjs from '@emailjs/browser';


@Component({
  selector: 'app-messageclient',
  templateUrl: './messageclient.component.html',
  styleUrls: ['./messageclient.component.scss']
})
export class MessageclientComponent implements OnInit {

  public emailForm!:FormGroup;

  constructor(
    private _snackBar:MatSnackBar,
    private _formBuilder:FormBuilder,
    private _mataDialog:MatDialog,
    private _matDialogRef:MatDialogRef<MessageclientComponent>
  ){}

  ngOnInit(): void {
    this.emailForm = this._formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      message:['',Validators.required],
      subject:['',Validators.required]
    })
  }

  onCancelClick(){
    this._matDialogRef.close();
  }

  get f(){
    return this.emailForm.controls;
  }

  sendEmail(){
    emailjs.send('default_service', 'template_ljytcln', {
      to: 'lungilehlakanyane@gmail.com',
      from_name: 'Lungile',
      message: 'Testing the emailJs library.'
    }).then(function(response) {
      console.log('Email sent successfully', response);
      
    }, function(error) {
      console.error('Email delivery failed', error);
    });
  }
}
