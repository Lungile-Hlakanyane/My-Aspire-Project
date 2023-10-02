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
import { CdkDragDrop, DragDropModule,moveItemInArray,transferArrayItem } from '@angular/cdk/drag-drop';
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

  filteredLeads:any[] =[];

  stageList:any[]=[];

  stages:string[]=['New Lead', 'Deal', 'Quotation', 'Lost', 'Win'];

  addNewStage(newStageName:string){
    this.stages.push(newStageName);
  }

  dataSource = new MatTableDataSource<any>();

  currentItem:any;

  newLead: Lead[] = [
    {
      leadId: "lead-001",
      leadName: "Lungile",
      status: "New Lead"
    },
    {
      leadId: "lead-002",
      leadName: "Sinawo",
      status: "Deal"
    },
    {
      leadId: "lead-004",
      leadName: "Blessing",
      status: "Quotation"
    },
    {
      leadId: "lead-005",
      leadName: "Pride",
      status: "Win"
    },
    {
      leadId: "lead-006",
      leadName: "Tk",
      status: "Lost"
    }
  ];

  onDragStart(item:any){
   
    this.currentItem = item;
  }

  filterLeads(status:string){
    return this.newLead.filter(m=>m.status == status)
  }

  onDrop(event:any, status:string){

    event.preventDefault();
    const record = this.newLead.find(m=>m.leadId == this.currentItem.leadId);
    if(record!=undefined){
      record.status = status;
    }
    this.currentItem = null;
  }

  onDragOver(event:any){
    event.preventDefault();
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

  leads:any[]=[];

  searchTerm:string ='';

  displayedColumns:string[]=[
    'person',
    'organization',
    'email',
    'mobile',
    'country',
    'region',
    'budget',
    'action'
  ]

  constructor(
    private _http:HttpClient,
    private _router:Router,
    private _dialog:MatDialog,
    private _leadService:LeadService,
    private _addStageService:AddStageService,
    private _snackBar:MatSnackBar,
    ){}

    applyFilter() {
      if (this.searchTerm) {
        this.filteredLeads = this.leads.filter((lead) =>
          lead.person.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.filteredLeads = this.leads.slice();
      }
    }

    ngOnInit(): void {

      this.filteredLeads = this.leads.slice();

      this._addStageService.getAllStages().subscribe((stages)=>{
        this.stageList = stages;
      })

      this._http.get<any[]>('http://localhost:3000/leads').subscribe((data)=>{
        this.leads=data;
        this.dataSource = new MatTableDataSource(this.leads);
      });
      this._leadService.getAllLeads().subscribe((data:Lead[])=>{
        this.dataSource.data = data;
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

  onDropLead(event: CdkDragDrop<Lead[]>): void {
    
    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  
      const movedLead = event.item.data;

      const newStageId = Number(event.container.id);
  
      this._leadService.updateLeadStage(movedLead.id, newStageId).subscribe(
        (response) => {
          // this._snackBar.open('Moved Lead Successfully', 'Ok');
          console.log('Moved Lead Successfully');
        },
        (error) => {
          this._snackBar.open('Error: Unable to move Lead', 'Ok');
        }
      );
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
   
  updateLeadStage(lead: any) {
    const apiUrl = `http://localhost:3000/leads/${lead.id}`;
    return this._http.patch(apiUrl, { stage: lead.stage });
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
