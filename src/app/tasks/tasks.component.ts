import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {

  //Define an array to hold our user data
  tasks: Array<any>;

  //Create an instance of the Dataservice
  constructor(private _dataService: DataService) {
    //Access the data services getUsers() method we defined
    this._dataService.getTasks()
      .subscribe(res => this.tasks = res['data']);
  }

  ngOnInit() {
  }

}
