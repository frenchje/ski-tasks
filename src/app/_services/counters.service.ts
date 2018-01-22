import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Counter} from "../_models/counter";

@Injectable()
export class CountersService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Counter[]>('/api/counters');
  }

  getById(_id: number) {
    return this.http.get('/api/counters/' + _id);
  }

  create(counter: Counter) {
    return this.http.post('/api/counters', counter);
  }

  update(counter: Counter) {
    return this.http.put('/api/counters/' + counter._id, counter);
  }

  delete(_id: number) {
    return this.http.delete('/api/counters/' + _id);
  }

}
