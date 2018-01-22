import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';

@Injectable()
export class UserService {

  //TODO: Update user model and mongo db to match definition below.
  //TODO: change Mongo calls to use an _id rather than an object _id.
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>('/api/users');
  }

  getById(_id: number) {
    return this.http.get('/api/users/' + _id);
  }

  create(user: User) {
    return this.http.post('/api/users', user);
  }

  update(user: User) {
    return this.http.put('/api/users/' + user._id, user);
  }

  delete(_id: number) {
    return this.http.delete('/api/users/' + _id);
  }
}
