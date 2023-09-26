import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../service/invoice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { ConfrmDialogComponent } from 'src/app/confrm-dialog/confrm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-invoice-infor',
  templateUrl: './invoice-infor.component.html',
  styleUrls: ['./invoice-infor.component.scss'],
  providers:[CurrencyPipe]
})
export class InvoiceInforComponent implements OnInit{

  invoices:any[]=[];
  invoice:any;
  selectedInvoice: any = {};
  total:number = 0;

  constructor(
    private _route:ActivatedRoute,
    private _invoiceService:InvoiceService,
    private _snackBar:MatSnackBar,
    private _http:HttpClient,
    private _router:Router,
    private _dialog:MatDialog,
    ){}

    displayedColumns:string[]=[
      'item',
      'description',
      'unitPrice',
      'quantity',
      'amount'
    ]

  ngOnInit(): void {

    this._route.params.subscribe(params=>{
      const invoiceId = params['id'];

      this._http.get<any>(`http://localhost:3000/invoices/${invoiceId}`).subscribe(response=>{
        this.invoice = response;
      })
    })

    this._invoiceService.getAllInvoices().subscribe((data)=>{
        this.invoices = data;
    })
 }

 selectInvoice(invoice: any): void {
  this.selectedInvoice = invoice;
}

calculateTotal():void{
  this.total =0;
  if(this.selectedInvoice && this.selectedInvoice.items){
    this.selectedInvoice.items.forEach((item: any) =>{
      this.total+=item.amount;
    });
  }
}

openDialog():void{
  const dialogRef = this._dialog.open(ConfrmDialogComponent);
  dialogRef.afterClosed().subscribe((result)=>{
    if(result){
      this._router.navigateByUrl('/login');
    }
  })
}

navigateToLeadPage():void{
  this._router.navigateByUrl('/lead');
}

navigateToSettingsPage():void{
  this._router.navigateByUrl('/settings');
}

navigateToInvoicePage():void{
  this._router.navigateByUrl('/invoice');
}

navigateToDashboard():void{
  this._router.navigateByUrl('/dashboard');
}


}
