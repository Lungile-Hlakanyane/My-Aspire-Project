import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SenderService {

  constructor(private _http:HttpClient) { }

  addSender(data:any):Observable<any>{
    return this._http.post('http://localhost:3000/senders',data);
  }

  updateSender(id:number,data:any):Observable<any>{
    return this._http.put(`http://localhost:3000/senders/${id}`,data)
  }

  getAllSenders():Observable<any[]>{
    return this._http.get<any[]>('http://localhost:3000/senders');
  }

  deleteSender(senderId:number):Observable<any>{
    const url = `http://localhost:3000/senders/${senderId}`;
    return this._http.delete(url);
  }

}
