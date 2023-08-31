import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from '../confrm-dialog/confrm-dialog.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Chart,registerables} from 'chart.js';
import { ChartServiceService } from '../chartservice/chart-service.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  invoices:any[] =[];
  estimates:any[] =[];
  clients:any[] =[];

  constructor(private _dialog:MatDialog,private _router:Router,
    private _chartService:ChartServiceService,private _http:HttpClient
    ){}
    //for invoice charts
    chartdata:any;
    labeldata:any[]=[];
    realdata:any[]=[];
    colordata:any[]=[];

    //for estimats charts
    estimatedata:any;
    estimatelabeldata:any[]=[];
    estimaterealdata:any[]=[];
    estimatecolordata:any[]=[];
   
    ngOnInit(): void {

      //fetch all the clients
      this._http.get<any[]>('http://localhost:3000/clients').subscribe(data=>{
        this.clients = data;
      })

      //fetch all the invoices
      this._http.get<any[]>('http://localhost:3000/invoice').subscribe(data=>{
        this.invoices = data;
      })

      //fetch all the estimates
      this._http.get<any[]>('http://localhost:3000/estimates').subscribe(data=>{
        this.estimates = data;
      });

      //all method for invoice
      this._chartService.getChartInfor().subscribe(result=>{

        this.chartdata = result;
        if(this.chartdata!=null){
          for(let i=0;i<this.chartdata.length;i++){
           
            this.labeldata.push(this.chartdata[i].month);
            this.realdata.push(this.chartdata[i].invoice);
            this.colordata.push(this.chartdata[i].colorcode);
          }
          this.renderChart(this.labeldata,this.realdata,this.colordata);
        }
      });
      //end for all method for invoice

      // all method for estimate
      this._chartService.getChartEstimates().subscribe(result=>{

        this.estimatedata = result;
        if(this.estimatedata !=null){
          for(let i=0;i<this.estimatedata.length;i++){
            this.estimatelabeldata.push(this.estimatedata[i].month);
            this.estimaterealdata.push(this.estimatedata[i].estimate);
            this.estimatecolordata.push(this.estimatedata[i].colorcode);
          }
          this.renderEstimateChart(this.estimatelabeldata,this.estimatedata,this.estimatecolordata);
        }
      })
    }
  // end all method for estimates


    renderChart(labeldata:any,maindata:any,colordata:any):void{
      new Chart("piechart",{
        type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Invoice',
          data: maindata,
          backgroundColor:colordata,
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      },
      options:{
        scales:{
          y:{
            beginAtZero:true
          }
        }
      }
      })

    }

    renderEstimateChart(estimatelabeldata:any,estimaterealdata:any,estimatecolordata:any){
      new Chart("estimateChart",{
        type: 'bar',
      data: {
        labels: estimatelabeldata,
        datasets: [{
          label: 'Estimates',
          data: estimaterealdata,
          backgroundColor:estimatecolordata,
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      },
      options:{
        scales:{
          y:{
            beginAtZero:true
          }
        }
      }
      })
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


  getTotalInvoices():number{
    return this.invoices.reduce((total,current)=>total + current.invoice,0);
  }

  getTotalEstimates():number{
    return this.estimates.length;
  }

  getTotalClients():number{
    return this.clients.length;
  }
}
