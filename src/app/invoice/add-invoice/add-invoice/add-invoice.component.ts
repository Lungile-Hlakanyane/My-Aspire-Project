import { Component,Inject,OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../service/invoice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit{

  invoices:any[]=[];

  invoiceForm:FormGroup;

  constructor(
    private _fb:FormBuilder,
    private _invoiceService:InvoiceService,
    private _snackBar:MatSnackBar,
    private _http:HttpClient,
    private _dialogRef:DialogRef<AddInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){
    this.invoiceForm = this._fb.group({
      invoice_number:['',Validators.required],
      invoice_date:['',Validators.required],
      due_date:['',Validators.required],
      sender_contact_name:['',Validators.required],
      sender_email:['',Validators.required,Validators.email],
      sender_physical_address:['',Validators.required],
      sender_mobile:['',Validators.required],
      receiver_contact_name:['',Validators.required],
      receiver_email:['',Validators.required,Validators.email],
      receiver_physical_address:['',Validators.required],
      receiver_mobile:['',Validators.required],
      title:['',Validators.required],
      description:['',Validators.required],
      quantity:['',Validators.required],
      rate:['',Validators.required],
      amount:['',Validators.required]
    })
  }

  get f (){
    return this.invoiceForm.controls;
  }

  onCancelClick():void{
    this._dialogRef.close();
  }

  onSubmit():void{

  
      if(this.data){

        this._invoiceService.updateInvoice(this.data.id,this.invoiceForm.value).subscribe({
          next:(val:any)=>{
           this._snackBar.open('Invoice details edited successfully','OK');
            this._dialogRef.close();
          },
          error:(err:any)=>{
            this._snackBar.open('An error occured unable to update an Invoice','OK');
          }
        })

      }else{
        this._invoiceService.addInvoice(this.invoiceForm.value).subscribe({
          next:(val:any)=>{
           this._snackBar.open('Invoice added successfully','OK');
            this._dialogRef.close();
          },
          error:(err:any)=>{
            this._snackBar.open('An error occured unable to add an Invoice','OK');
          }
        })
      }
  }

  ngOnInit(): void {
    this.invoiceForm.patchValue(this.data);
    this._invoiceService.getAllInvoices().subscribe(data=>{
      this.invoices = data;
    });
  }
}
