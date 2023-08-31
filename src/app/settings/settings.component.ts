import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from '../confrm-dialog/confrm-dialog.component';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';


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
    private _formBuilder:FormBuilder
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

  navigateToDashboard():void{
    this._router.navigateByUrl('dashboard');
  }

  navigateToLeadPage():void{
    this._router.navigateByUrl('/lead');
  }

  navigateToInvoicePage():void{
    this._router.navigateByUrl('/invoice');
  }
  
  navigateToSettingsPage():void{
    this._router.navigateByUrl('/settings');
  }

  get name(){
    return this.settingsForm.get('name');
  }

  get website(){
    return this.settingsForm.get('website');
  }
  get email(){
    return this.settingsForm.get('email');
  }
  get mobile(){
    return this.settingsForm.get('mobile');
  }
  get zipcode(){
    return this.settingsForm.get('zipcode');
  }
  get address(){
    return this.settingsForm.get('address');
  }

  storeUserSettings(){

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
