import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  constructor(private _http:HttpClient) { }

  getChartInfor(){
    return this._http.get('http://localhost:3000/invoice');
  }

  getChartEstimates(){
    return this._http.get(' http://localhost:3000/estimates');
  }
}
