import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from 'src/app/confrm-dialog/confrm-dialog.component';
import { AddClientComponent } from '../add-client/add-client.component';
import { MessageclientComponent } from 'src/app/messageclient/messageclient.component';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})


export class ClientInfoComponent implements OnInit{

  client:any;

  selectedClient:any= null;

  constructor(
    private _route:ActivatedRoute,
    private _http:HttpClient,
    private _router:Router,
    private _dialog:MatDialog){
    }

  ngOnInit():void{
    this._route.params.subscribe(params => {

      const clientId = params['clientId'];
    
      this._http.get<any>(`http://localhost:3000/clients/${clientId}`).subscribe(response=>{
        this.client = response;
      })
    }) 
  }

  openEditForm(data:any):void{
    this._dialog.open(AddClientComponent,{
      data
    });
  }

  openDialog():void{
    const dialogRef = this._dialog.open(ConfrmDialogComponent);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this._router.navigateByUrl('/login');
      }
    })
  }

  openMessageDialogBox(){
    this._dialog.open(MessageclientComponent);
  }
}
