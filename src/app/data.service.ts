import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private _http: HttpClient) { }

  public getUsers(): Observable<any> {
    return this._http.get<any>("/api/users");
  }

  public getTasks(): Observable<any> {
    return this._http.get<any>("/api/tasks");
  }

  public getUser(id: string): Observable<any> {
   // let params = new HttpParams().set('id', id);
    let apiUrl = 'api/users/' + id;

    return this._http.get<any>(apiUrl);
  }

  public saveUser(user: any): Observable<any> {

    let apiUrl = 'api/users/' + user._id;

    return this._http.post<any>(apiUrl,user);
  }

  public deleteUser(user: any): Observable<any> {
    let apiUrl = 'api/users/' + user._id;
    return this._http.delete<any>(apiUrl);
  }
}
