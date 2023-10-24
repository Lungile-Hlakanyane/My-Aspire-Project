import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from '../confrm-dialog/confrm-dialog.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Chart,registerables} from 'chart.js';
import { ChartServiceService } from './chartservice/chart-service.service';
Chart.register(...registerables);

interface InvoicesByMonth {
  [key: string]: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{

  invoices:any[] =[];// Store the invoices data
  chartData:any ={}; // Store data for the chart
  chartOptions: any = {}; // Define chartOptions

  estimates:any[] =[]; // Store the estimates data
  estimateChartData:any ={}; // Store data for the chart
  estimateChartOptions:any ={}; // Define chartOptions


  clients:any[] =[];
  leads:any[] =[];

  constructor(
    private _dialog:MatDialog,
    private _router:Router,
    private _chartService:ChartServiceService,
    private _http:HttpClient
    ){}

    ngOnInit(): void {

      //fetch all the clients
      this._http.get<any[]>('http://localhost:3000/clients').subscribe(data=>{
        this.clients = data;
      })

      //fetch all the invoices
      this._http.get<any[]>('http://localhost:3000/invoices').subscribe(data=>{
        this.invoices = data;

        //Process data and create chart
        this.createInvoiceChart();

      })

      //fetch all the estimates
      this._http.get<any[]>('http://localhost:3000/estimates').subscribe(data=>{
        this.estimates = data;

        //Process data and create chart
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
    // Group invoices by month and count the number of invoices in each month
    const groupedData = this.invoices.reduce((acc, invoice) => {
      const invoiceDate = new Date(invoice.invoice_date);
      const month = invoiceDate.toLocaleString('default', { month: 'long' });
      // const monthYear = `${invoiceDate.getFullYear()}-${invoiceDate.getMonth() + 1}`;

      if (!acc[month]) {
        acc[month] = 0;
      }

      acc[month]++;

      return acc;
    }, {});

    // Extract months and counts for the chart
    const months = Object.keys(groupedData);
    const invoiceCounts = Object.values(groupedData);

    // Create the chart
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
