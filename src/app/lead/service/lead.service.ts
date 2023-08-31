import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(private _http:HttpClient) { }

  addLead(data:any):Observable<any>{
    return this._http.post('http://localhost:3000/leads',data);
  }

  updateLead(leadId:number,updatedData:any):Observable<any>{
    const url = `http://localhost:3000/leads/${leadId}`;
    return this._http.put(url,updatedData);
  }

  deleteLead(leadId:number):Observable<any>{
    const url = `http://localhost:3000/leads/${leadId}`;
    return this._http.delete(url);
  }  
}
