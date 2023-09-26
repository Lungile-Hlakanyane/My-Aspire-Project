import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:4200';

  constructor(private _http:HttpClient) { }

  login(email:string,password:string){
    return this._http.get<any>(`${this.apiUrl}/users?email=${email}&password=${password}`)
      .pipe(
        map(registerd_users => {
          if (registerd_users.length === 1) {
            // User is found, authentication successful
            localStorage.setItem('currentUser', JSON.stringify(registerd_users[0]));
            return true;
          } else {
            // User not found, authentication failed
            return false;
          }
        })
      );
  }

  logout(){
    localStorage.removeItem('user');
  }

  isLoggedIn():boolean{
    if(localStorage.getItem('user')){
      return true;
    }
    return false;
  }
}
