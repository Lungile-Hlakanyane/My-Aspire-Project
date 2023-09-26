import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private _http:HttpClient) { }


  getAllInvoices():Observable<any[]>{
    return this._http.get<any[]>('http://localhost:3000/invoices');
  }

  addInvoice(data:any){
    return this._http.post('http://localhost:3000/invoices',data);
  }

  updateInvoice(invoiceId:number,updatedData:any):Observable<any>{
    const url = `http://localhost:3000/invoices/${invoiceId}`;
    return this._http.put(url,updatedData);
  }
  
  deleteInvoice(invoiceId:number):Observable<any>{
    const url =`http://localhost:3000/invoices/${invoiceId}`;
    return this._http.delete(url);
  }

  getInvoiceDetails(id:number):Observable<any>{
    const url = `http://localhost:3000/invoices/${id}`;
    return this._http.get<any>(url);
  }
}
