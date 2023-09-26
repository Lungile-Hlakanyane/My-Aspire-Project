import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfrmDialogComponent } from '../confrm-dialog/confrm-dialog.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { InvoiceService } from './service/invoice.service';
import { HttpClient } from '@angular/common/http';
import { Invoice } from './invoice.interface';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CurrencyPipe } from '@angular/common';
import { DeleteInvoiceComponent } from './delete-invoice/delete-invoice/delete-invoice.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice/add-invoice.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  providers:[CurrencyPipe]
})
export class InvoiceComponent implements OnInit{

  dataSource = new MatTableDataSource<any>();

  invoices:any[]=[];

  searchTerm:string='';

  displayedColumns:string[]=[
    'invoiceNumber',
    'invoiceDate',
    'dueDate',
    'title',
    'quantity',
    'rate',
    'amount',
    'action'
  ];

  constructor(
    private _router:Router,
    private _dialog:MatDialog,
    private _invoiceService:InvoiceService,
    private _http:HttpClient,
    ){}

    applyFilter(){
      this.dataSource.filter = this.searchTerm.trim().toLocaleLowerCase();
    }

    openDialogInvoicePage(){
      this._dialog.open(AddInvoiceComponent);
    }

    openDeleteInvoiceDialog(invoiceId:number):void{
      const dialogRef = this._dialog.open(DeleteInvoiceComponent,{
        data:{invoiceId}
      })
    }

   
    openEditForm(data:any){
      this._dialog.open(AddInvoiceComponent,{
        data
      });
    }

  ngOnInit(): void {
    this._invoiceService.getAllInvoices().subscribe((data)=>{
      this.invoices = data;
      this.dataSource = new MatTableDataSource(this.invoices);
    });
    this._invoiceService.getAllInvoices().subscribe((data:Invoice[])=>{
      this.dataSource.data = data;
    })
  }


  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator)paginator!:MatPaginator;

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  navigateToLeadPage():void{
    this._router.navigateByUrl('lead');
  }

  navigateToInvoicePage():void{
    this._router.navigateByUrl('/invoice');
  }

  navigateToSettingsPage():void{
    this._router.navigateByUrl('/settings');
  }

  openAddInvoicePage():void{
    this._router.navigateByUrl('/add-invoice');
  }

  navigateToInvoiceDetails(invoiceId:string){
    this._router.navigate(['/invoice',invoiceId]);
   
  }

  openDialog():void{
    const dialogRef = this._dialog.open(ConfrmDialogComponent);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this._router.navigateByUrl('/login');
      }
    })
  };
}
