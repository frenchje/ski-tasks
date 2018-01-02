import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  //Define an array to hold our user data
  users: Array<any>;

  //Create an instance of the Dataservice
  constructor(private _dataService: DataService) {
    //Access the data services getUsers() method we defined
    this._dataService.getUsers()
      .subscribe(res => this.users = res['data']);
  }

  ngOnInit() {
  }

  deleteUser(user) {
    this._dataService.deleteUser(user).subscribe( (res)=>
    {
      console.log("Delete Successful call getUsers");
      this._dataService.getUsers()
        .subscribe((res) => {console.log("Got users"); this.users = res['data']});
    });

  }

}
