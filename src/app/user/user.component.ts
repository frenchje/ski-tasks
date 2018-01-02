import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
//TODO: get id value from router
  //Define an array to hold our user data

  //User properties
  user: any;
  userId: string;

  addUser: boolean;

  //List of classifications for dropdown.
  classifications: Array<any> = [{id: 'PATROLLER', display: 'Patroller'},
    {id: 'ALPINE', display: 'Alpine'},
    {id: 'SENIOR', display: 'Senior'},
    {id: 'CERTIFIED', display: 'Certified'}
  ];

  //Create an instance of the Dataservice
  constructor(private _dataService: DataService, private route: ActivatedRoute, private _router: Router) {

    this.addUser = false;
    //Get User Id from Url Parameter
    this.route.params.subscribe(res => this.userId = res.id);

    if(this.userId === undefined || this.userId === null || this.userId === 'add') {
      this.addUser = true;
    }

    //Access the data services getUsers() method we defined
    if (this.addUser)
      this.user = {
        firstName:null,
        lastName: null,
        emailAddress: null,
        classification: null
      };
    else
      this._dataService.getUser(this.userId)
        .subscribe(res => this.user = res['data']);
  }

  onSubmit() {
    this._dataService.saveUser(this.user)
      .subscribe(res => {this.user = res['data'];

        if(this.user._id !== undefined && this.user._id !== null && (this.userId === null || this.userId === undefined || this.userId === 'add')) {
          this.userId = this.user._id;
          this._router.navigate(['/users/'+this.userId]);
        }
      });
  }

  ngOnInit() {

  };
}




