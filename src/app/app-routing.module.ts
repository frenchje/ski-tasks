import { NgModule } from '@angular/core';

import {Routes, RouterModule } from '@angular/router';

import { HomeComponent } from  './home/home.component';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "./_guards/auth.guard";
import { UsersComponent } from './users/users.component';
import { TasksComponent } from './tasks/tasks.component';
import { UserComponent } from './user/user.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'users/:id', component: UserComponent },
  { path: 'users/add', component: UserComponent },

  // Otherwise direct to home
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
