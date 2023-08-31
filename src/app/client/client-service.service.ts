import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './add-client/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  private apiUrl = 'http://localhost:3000/clients';

  constructor(private _http:HttpClient) { }

  //get all clients from the Json file
  getClients():Observable<Client[]>{
    return this._http.get<Client[]>(this.apiUrl);
  }

  //add client to the json file
  addClient(client:any):Observable<any>{
    return this._http.post(this.apiUrl,client);
  }

}
