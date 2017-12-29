import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this._http.get<any>('api/users/${id}');
  }
}
