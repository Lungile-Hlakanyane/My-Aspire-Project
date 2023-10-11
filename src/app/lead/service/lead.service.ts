import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';import { Lead } from '../lead.interface';
;

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  private leadsUrl = 'http://localhost:3000/leads';
  private apiUrl = 'http://localhost:3000/leads';

  constructor(private _http:HttpClient) { 
  }

  getAllLeads(): Observable<any[]> {
    return this._http.get<any[]>('http://localhost:3000/leads');
  }

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

  updateLeadStage(leadId: number, newStageId: number):Observable<any>{
    const updateUrl = `${this.leadsUrl}/${leadId}`;
    return this._http.patch(updateUrl,{stageId:newStageId});
  }

  updateLeadStatus(leadId: number, newStatus: string): Observable<any> {
    return this._http.patch(`${this.apiUrl}/${leadId}`, { status: newStatus });
  }

  // moveLeadToClients(lead:Lead){
  //     return this._http.post(`${this.apiUrl}/clients`, lead).subscribe((response) => {
  //   },
  //   (error)=>{
  //     console.log('Error adding a lead to clients',error);
  //   }
  //   );
  // }

  moveLeadToClients(lead: Lead) {
    // return this._http.post(`${this.apiUrl}/clients`, lead);
    return this._http.post('http://localhost:3000/leads',lead);
  }
}
