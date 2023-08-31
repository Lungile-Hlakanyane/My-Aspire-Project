import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from '../confrm-dialog/confrm-dialog.component';
import { AddEstimateComponent } from './add-estimate/add-estimate.component';
import { MatTableDataSource } from '@angular/material/table';
import { Estimate } from './estmate.interface';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EstimateService } from './service/estimate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteEstimateComponent } from './delete-estimate/delete-estimate.component';


@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.scss']
})
export class EstimateComponent implements OnInit {
  searchTerm:string ='';
  displayedColumns:string[]=['id','contact_name','total','status','date', 'action']
  estimateData:MatTableDataSource<Estimate> = new MatTableDataSource<Estimate>([]);

  estimates:any[] =[];

  constructor(
    private _router:Router,
    private _dialog:MatDialog,
    private _http:HttpClient,
    private _estimateService:EstimateService,
    private _snackBar:MatSnackBar
    ){}

  ngOnInit(): void {
   this._http.get<any[]>('http://localhost:3000/estimates').subscribe(data=>{
    this.estimates = data;

    this.estimateData = new MatTableDataSource(this.estimates);
   });
   
   this._estimateService.getEstimates().subscribe((data:Estimate[])=>{
    this.estimateData.data = data;
    this.displayEstimateOnConsole(data);
   })
  }

  editEstimate(estimate:any){
    this._snackBar.open('Edit clicked....','OK');
  }

  openDeleteEstimateDialog(estimateId:number):void{
    const dialogRef = this._dialog.open(DeleteEstimateComponent,{
      data:{estimateId}
    });
  }


  deleteEstimate(estimateId:number):void{
    const url = ` http://localhost:3000/estimates/${estimateId}`;

    this._http.delete(url).subscribe(()=>{

      this.estimates = this.estimates.filter(estimate=> estimate.id !==estimateId);

      this._snackBar.open('Estimate successfully deleted','Close',{
        duration:3000,
        panelClass:['success-snackbar']
      });
    },
    (error)=>{
      this._snackBar.open('Error deleting estimate','Close',{
        duration:3000,
        panelClass:['error-snackbar']
      });
    }
    
    )
    
  }



  displayEstimateOnConsole(estimates:Estimate[]):void{
    console.log('Estimate Data: ',estimates);

  }

  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  filterEstimate(){
    return this.estimates.filter(estimate=>{
      return (
        estimate.contact_name.toLowerCase().includes(this.searchTerm.toLowerCase())||
        estimate.status.toLowerCase().includes(this.searchTerm.toLowerCase())||
        estimate.total.toLowerCase().includes(this.searchTerm.toLowerCase())||
        estimate.date.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    })
  }

  applyFilter(){
    
    this.estimateData.filter = this.searchTerm.trim().toLowerCase();

  }

  ngAfterViewInit(){
    this.estimateData.sort = this.sort;
    this.estimateData.paginator = this.paginator;
  }

  openEditForm(data:any){
    this._dialog.open(AddEstimateComponent,{
      data
    })
  }

  openAddEstimateForm():void{
    this._dialog.open(AddEstimateComponent);
  }


  navigateToDashboard():void{
    this._router.navigateByUrl('/dashboard');
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

  openDialog():void{
    
    const dialogRef = this._dialog.open(ConfrmDialogComponent);

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this._router.navigateByUrl('/login');
      }
    })
  }
}
