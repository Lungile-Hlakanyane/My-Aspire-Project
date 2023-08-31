import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private _http:HttpClient) { }

  addClient(data:any):Observable<any>{
    return this._http.post('http://localhost:3000/clients',data);
  }

  updateClient(id:number,data:any):Observable<any>{
    return this._http.put(`http://localhost:3000/clients/${id}`,data);
  }
}
