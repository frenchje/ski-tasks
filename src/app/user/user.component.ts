import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
//TODO: get id value from router
  //Define an array to hold our user data
  user: any;
  userId: string;

  //Create an instance of the Dataservice
  constructor(private _dataService: DataService, private route: ActivatedRoute) {
    //Access the data services getUsers() method we defined

    this.route.params.subscribe(res => this.userId = res.id);

    this._dataService.getUser(this.userId)
      .subscribe(res => this.user = res['data']);
  }

  ngOnInit() {
  }

}
