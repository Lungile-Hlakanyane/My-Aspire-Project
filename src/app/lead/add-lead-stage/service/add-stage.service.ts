import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class AddStageService {

  constructor(private _http:HttpClient) { }

  getAllStages():Observable<any[]>{
    return this._http.get<any[]>('http://localhost:3000/stages');
  }

  addStage(data:any):Observable<any>{
    return this._http.post('http://localhost:3000/stages',data);
  }

  updateStage(stageId:number,updatedData:any):Observable<any>{
    const url =`http://localhost:3000/stages/${stageId}`;
    return this._http.put(url,updatedData);
  }

  deleteStage(id:number):Observable<any>{
    const url =`http://localhost:3000/stages/${id}`;
    return this._http.delete(url);
  } 
}
