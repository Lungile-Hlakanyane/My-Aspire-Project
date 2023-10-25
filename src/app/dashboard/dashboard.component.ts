import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from '../confrm-dialog/confrm-dialog.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Chart,registerables} from 'chart.js';
import { ChartServiceService } from './chartservice/chart-service.service';
Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{

  invoices:any[] =[];
  chartData:any ={};
  chartOptions: any = {};

  estimates:any[] =[];
  estimateChartData:any ={}; 
  estimateChartOptions:any ={};

  clients:any[] =[];
  leads:any[] =[];

  constructor(
    private _dialog:MatDialog,
    private _router:Router,
    private _chartService:ChartServiceService,
    private _http:HttpClient
    ){}

    ngOnInit(): void {

      this._http.get<any[]>('http://localhost:3000/clients').subscribe(data=>{
        this.clients = data;
      })

      this._http.get<any[]>('http://localhost:3000/invoices').subscribe(data=>{
        this.invoices = data;

        this.createInvoiceChart();
      })

      this._http.get<any[]>('http://localhost:3000/estimates').subscribe(data=>{
        this.estimates = data;

        this.createEstimateChart();
      });

      this._http.get<any[]>('http://localhost:3000/leads').subscribe(data=>{
        this.leads = data;
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

  createEstimateChart() {
    const groupedData = this.estimates.reduce((acc, estimate) => {
      const estimateDate = new Date(estimate.date);
      const month = estimateDate.toLocaleString('default', { month: 'short' });

      if (!acc[month]) {
        acc[month] = 0;
      }

      acc[month]++;

      return acc;
    }, {});

    const months = Object.keys(groupedData);
    const estimateCounts = Object.values(groupedData);

    this.estimateChartData = {
      labels: months,
      datasets: [
        {
          data: estimateCounts,
          label: 'Number of Estimates per Month',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };
  }

  createInvoiceChart() {
    const groupedData = this.invoices.reduce((acc, invoice) => {
      const invoiceDate = new Date(invoice.invoice_date);
      const month = invoiceDate.toLocaleString('default', { month: 'long' });
    
      if (!acc[month]) {
        acc[month] = 0;
      }

      acc[month]++;

      return acc;
    }, {});

    const months = Object.keys(groupedData);
    const invoiceCounts = Object.values(groupedData);

    this.chartData = {
      labels: months,
      datasets: [
        {
          data: invoiceCounts,
          label: 'Number of Invoices per Month',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };
  }

  getTotalInvoices():number{
    return this.invoices.length;
  }

  getTotalEstimates():number{
    return this.estimates.length;
  }

  getTotalClients():number{
    return this.clients.length;
  }

  getTotalLeads():number{
    return this.leads.length;
  }
}
