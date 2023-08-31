import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Estimate } from '../estmate.interface';


@Injectable({
  providedIn: 'root'
})
export class EstimateService {

  private apiUrl = 'http://localhost:3000/estimates';

  constructor(private _http:HttpClient) { }

  //get all estimate from the JSON File
  getEstimates():Observable<Estimate[]>{
    return this._http.get<Estimate[]>(this.apiUrl);
  }

  //add estimate to JSON File
  addEstimate(estimate:any):Observable<any>{
    return this._http.post(this.apiUrl,estimate);
  }

  
  updateEstimate(id:number,data:any):Observable<any>{
    return this._http.put(`http://localhost:3000/estimates/${id}`,data);
  }

  
}
