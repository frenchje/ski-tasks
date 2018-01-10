import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username:string, password: string) {
    //TODO: Create api method to perform this check against mongo.
    //TODO: Update call to use HttpClient so we don't need to use the map function.
    return this.http.post<any>('/api/authenticate', {username: username, password: password })
      .map(user => {
        //login successful
        if(user && user.token) {
          //store token in local Storage
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  //TODO: Update to provide time etc. for cookie values.
  logout() {
    //Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
