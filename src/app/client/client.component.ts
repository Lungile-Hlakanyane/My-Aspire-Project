import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from '../confrm-dialog/confrm-dialog.component';
import { AddClientComponent } from './add-client/add-client.component';
import { MatTableDataSource } from '@angular/material/table';
import { ClientServiceService } from './client-service.service';
import { Client } from './add-client/client.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { DeleteClientComponent } from './delete-client/delete-client.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  
  displayedColumns: string[]=['contact_name','email','mobile','type','author','date','actions'];
  
  clients:any[]=[];

  searchTerm:string ='';

  showClientOptions:boolean = false;

  showEstimateInvoiceOptions:boolean = false;

  toggleEstimateInvoice(){
    this.showEstimateInvoiceOptions =!this.showEstimateInvoiceOptions;
  }


  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  toggleClientOptions(){
    // this._snackBar.open('Ellipsis Clicked','OK');
    this.showClientOptions = !this.showClientOptions;
  }


  constructor(
    private _router:Router,
    private _dialog:MatDialog,
    private _dataService:ClientServiceService,
    private _http:HttpClient,
    private _snackBar:MatSnackBar
    ){
      
    }

    // Search for a client based on a client attributes or fields
    filterClient(){
      return this.clients.filter(client=>{
        return (
          client.contact_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          client.mobile.includes(this.searchTerm) ||
          client.author.includes(this.searchTerm)||
          client.type.includes(this.searchTerm)||
          client.date.includes(this.searchTerm)
        );
      })
    }

  ngOnInit() {

     // fetch clients from the API
     this._http.get<any[]>('http://localhost:3000/clients').subscribe(data=>{
      this.clients = data;

      this.dataSource = new MatTableDataSource(this.clients);

    });
    this._dataService.getClients().subscribe((data:Client[])=>{
      this.dataSource.data = data;
      this.displayClientsOnConsole(data);
    })
  }

  navigateToClientProfile(clientId: string) {
    console.log('Navigating to client profile:', clientId);
    this._router.navigate(['/client', clientId]);
  }

  applyFilter(){
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  openDeleteClietDialog(clientId:number):void{
    const dialogRef = this._dialog.open(DeleteClientComponent,{
      data:{clientId}
    })
  };

  deleteClient(clientId: number): void {
    const url = `http://localhost:3000/clients/${clientId}`;
  
    this._http.delete(url).subscribe(
      () => {
        // Remove the deleted client from the local array
        this.clients = this.clients.filter(client => client.id !== clientId);
  
        // Show snackbar notification
        this._snackBar.open('Client successfully deleted', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      (error) => {
        
        // Show snackbar notification for error
        this._snackBar.open('Error deleting client', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  openEditForm(data:any){
    this._dialog.open(AddClientComponent,{
      data
    });
  }
  
  displayClientsOnConsole(clients:Client[]):void{
    console.log('Client Data: ',clients);
  }
  
  openAddClientDialogBox():void{
    const dialogRef = this._dialog.open(AddClientComponent);
  }


  navigateToDashboard():void{
    this._router.navigateByUrl('');
  }

  navigateToLeadPage():void{
    this._router.navigateByUrl('');
  }

  navigateToInvoicePage():void{
    this._router.navigateByUrl('');
  }


  navigateToSettingsPage():void{
    this._router.navigateByUrl('');
  }

  openDialog():void{
    const dialogRef = this._dialog.open(ConfrmDialogComponent);

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this._router.navigateByUrl('login');
      }
    })
  }
}

