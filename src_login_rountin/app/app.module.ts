import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { routing } from "./app.routing";
import { AuthGuard } from "./_guards/auth.guard";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import {
  AlertService,
  AuthenticationService,
  UserService
} from "./_services/index";
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { User } from './_models/index';
import { AlertComponent } from './_directives/index';

import { JwtInterceptor } from './_helpers/index';
import { fakeBackendProvider } from './_helpers/index';
import { GridsterModule} from 'angular2gridster';
import { ChartModule } from 'angular2-highcharts';
// import { DoughnutChartComponent, PieChartComponent, BarChartComponent } from 'angular-d3-charts'; // this is needed!

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
  //   DoughnutChartComponent, 
  //  PieChartComponent, 
  //  BarChartComponent,

  ],
  imports: [BrowserModule, AppRoutingModule, routing,FormsModule,HttpModule,HttpClientModule,GridsterModule.forRoot()],
  providers: [AuthGuard, AlertService, AuthenticationService, UserService,{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
},

// provider used to create fake backend
fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
