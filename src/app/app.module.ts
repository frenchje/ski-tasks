import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule} from "@angular/forms";

import { RouterModule, Routes} from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



//Import the HTTP module and our data service
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { AlertComponent } from './_directives/alert.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthGuard } from "./_guards/auth.guard";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { AlertService } from "./_services/alert.service";
import { UserService } from "./_services/user.service";
import {AuthenticationService} from "./_services/authentication.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksComponent,
    UsersComponent,
    UserComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    DataService,
    AlertService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
