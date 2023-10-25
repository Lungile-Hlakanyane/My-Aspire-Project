import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from '../confrm-dialog/confrm-dialog.component';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
// import { SubSideBarComponent } from './sub-side-bar/sub-side-bar.component';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  
  showEstimateInvoiceOptions:boolean = false;

  toggleEstimateInvoice(){
    this.showEstimateInvoiceOptions =!this.showEstimateInvoiceOptions;
  }

  public settingsForm!:FormGroup;

  constructor(private _router:Router,
    private _dialog:MatDialog,
    private _formBuilder:FormBuilder,
    // private _subSideBar:SubSideBarComponent
    ){}

  ngOnInit(){
    this.settingsForm = this._formBuilder.group({
      name:['',Validators.required],
      website:['',Validators.required],
      email:['',Validators.required, Validators.email],
      mobile:['',Validators.required,Validators],
      zipcode:['',Validators.required],
      address:['',Validators.required]
    })
  }

  get f (){
    return this.settingsForm.controls;
  }

  openDialog(){
    const dialogRef = this._dialog.open(ConfrmDialogComponent);
    
    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this._router.navigateByUrl('/login');
      }
    })
  }
}
