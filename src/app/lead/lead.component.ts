import { Component, Inject, OnInit,ViewChild } from '@angular/core';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from '../confrm-dialog/confrm-dialog.component';
import { HttpClient } from '@angular/common/http';
import { LeadService } from './service/lead.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteLeadComponent } from './delete-lead/delete-lead/delete-lead.component';
import { Lead } from './lead.interface';
import { CurrencyPipe } from '@angular/common';
import { AddStageComponent } from './add-lead-stage/add-stage/add-stage.component';
import { AddStageService } from './add-lead-stage/service/add-stage.service';
import { DeleteLeadStageComponent } from './delete-lead-stage/delete-lead-stage.component';
import { LeadInfoComponent } from './lead-info/lead-info.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss'],
  providers:[CurrencyPipe],
  
})
export class LeadComponent implements OnInit {

  filteredLeads: any[] = [];//included

  stageList:any[]=[];//included

  newFilteredLeads:any[] =[];

  disableEditButton: boolean[] = [];

  stages:string[]=['New Lead', 'Deal', 'Quotation', 'Lost', 'Win'];

  addNewStage(newStageName:string){
    this.stages.push(newStageName);
  }

  dataSource = new MatTableDataSource<any>();

  currentItem:any;
 
  onDragStart(item: any) {
    this.currentItem = item;
    console.log('onDragStart');
  }

  item: any;

  onDrop(event: any, status: string) {
    event.preventDefault();
  
    if (this.currentItem) {
      const originalStatus = this.currentItem.status;
      this.currentItem.status = status;
  
      // If the current status is 'deal' and the new status is not 'deal', disable edit button
      if (originalStatus === 'deal' && status !== 'deal') {
        this.disableEditButton[this.currentItem.id] = true;
      }
  
      // Rest of your onDrop logic
      this._leadService.updateLeadStatus(this.currentItem.id, status).subscribe(() => {
        const message = status === 'win'
          ? `Congratulations, You have a new client - Status: ${status}`
          : `Lead status updated to ${status} successfully`;
  
        this._snackBar.open(message, 'OK');
  
        this._leadService.moveLeadToClients(this.currentItem).subscribe((response) => {
          // this._snackBar.open('Added successfully as a Client','Ok');
        }, (error) => {
          console.log('Error adding lead to clients', error);
        });
      });
  
      if (status === 'win') {
        this._snackBar.open('Congratulations, You have a new Client', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      } else {
        this._snackBar.open('Lead status updated successfully updated', 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
      this.currentItem = null;
    }
  }
  
  onDragOver(event: any, status: string) {
    event.preventDefault();
    console.log('OnDragOver');
  }
  
  openAddLeadStage():void{
    const dialogRef = this._dialog.open(AddStageComponent,{
      width:'400px',
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.addNewStage(result);
      }
    })
  }

  leads:any[]=[];//included

  searchTerm:string ='';
  searchUnavailable:boolean=false;

  constructor(
    private _http:HttpClient,
    private _router:Router,
    private _dialog:MatDialog,
    private _leadService:LeadService,
    private _addStageService:AddStageService,
    private _snackBar:MatSnackBar,
    ){}

    applyFilter() {
      this.filteredLeads = this.leads.filter((lead) =>
        lead.person && lead.person.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    
      this.searchUnavailable = this.filteredLeads.length === 0;
    }
    

    ngOnInit(): void {

      this._http.get<any[]>('http://localhost:3000/leads').subscribe((data)=>{
        this.leads = data;
      })

      this._addStageService.getAllStages().subscribe((stages)=>{
        this.stageList = stages;
      })

      this.leads.forEach((lead)=>{
        this.disableEditButton[lead.id] = lead.status !== 'deal';
      })

      this._http.get<any[]>('http://localhost:3000/leads').subscribe((data)=>{
        this.leads=data;
        this.filteredLeads = this.filterLeadByStage(1);
        this.filteredLeads = this.leads.slice();
        this.dataSource = new MatTableDataSource(this.leads);
      });

      this._leadService.getAllLeads().subscribe((data:Lead[])=>{
        this.dataSource.data = data;
      })
    }

    //included
    newFilterLeads(status:string):any[]{
      return this.leads.filter((lead)=>lead.status === status);
    }

    filterLeadByStage(stageId:number){
      return this.leads.filter((lead)=>{
        return lead.stageId === stageId;
      })
    }
    
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openAddLeadForm():void{
    const dialogRef = this._dialog.open(AddLeadComponent);
  }

  openLeadInfoDialogBox(){
    this._dialog.open(LeadInfoComponent);
  }

  openDialog():void{
    const dialogRef = this._dialog.open(ConfrmDialogComponent);

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this._router.navigateByUrl('/login');
      }
    })
  }

  openDeleteLeadDialog(leadId:number):void{
    const dialogRef = this._dialog.open(DeleteLeadComponent,{
      data:{leadId}
    })
  }

  openDeleteLeadStageDialogBox(leadStageId:number):void{
    const dialogRef = this._dialog.open(DeleteLeadStageComponent,{
      data:{leadStageId}
    })
  }

  openEditLeadStageForm(data:any){
    const dialogRef = this._dialog.open(AddStageComponent,{
      data
    })
  }

  openEditForm(data:any){
    this._dialog.open(AddLeadComponent,{
      data
    });
  }

  navigateToDashboard():void{
    this._router.navigateByUrl('/dashboard');
  }
  
  navigateToSettings():void{
    this._router.navigateByUrl('/settings');
  }

  navigateToLeadPage():void{
    this._router.navigateByUrl('/lead');
  }

  navigateToInvoicePage():void{
    this._router.navigateByUrl('invoice');
  }

  navigateToSettingsPage():void{
    this._router.navigateByUrl('/settings');
  }

  displayMoreLeadInfo():void{
    this._dialog.open(LeadInfoComponent);
  }

  
  updateClientSideData(lead: any, newStage: string): void {
    const index = this.leads.findIndex((l) => l.id === lead.id);
    if (index !== -1) {
      this.leads[index].stage = newStage;
    }
  }
  
  openEditStage(data:any){
    this._dialog.open(AddStageComponent,{
      data
    })
  }
  
  openLeadStageDialogBox():void{
     this._dialog.open(DeleteLeadStageComponent)
  }
}
