import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import bootstrap from 'bootstrap';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';


import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { ReviewComponent } from './review/review.component';
import { SummaryComponent } from './summary/summary.component';
import { DeviceDetailsComponent } from './shared/device-details/device-details.component';
const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    modules,
    FontAwesomeModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    DeviceInfoComponent,
    ReviewComponent,
    SummaryComponent,
    DeviceDetailsComponent,
  ],
  schemas: [
  NO_ERRORS_SCHEMA
],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
