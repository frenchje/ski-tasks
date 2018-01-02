import { NgModule } from '@angular/core';

import {Routes, RouterModule } from '@angular/router';

import { HomeComponent } from  './home/home.component';
import { UsersComponent } from './users/users.component';
import { TasksComponent } from './tasks/tasks.component';
import { UserComponent } from './user/user.component';

import {Task} from "protractor/built/taskScheduler";

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'users/:id', component: UserComponent },
  { path: 'users/add', component: UserComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
