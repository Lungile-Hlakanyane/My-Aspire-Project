import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private rememberMeKey = 'rememberMe';

  constructor(private _http:HttpClient) { }

  setRememberMe(value: boolean){
    localStorage.setItem(this.rememberMeKey, JSON.stringify(value));
  }

  getRememberMe(): boolean {
    const value = localStorage.getItem(this.rememberMeKey);
    return value ? JSON.parse(value) : false;
  }

}
