import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';
import { LoginComponent } from './login/login.component';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { ReviewComponent } from './review/review.component';
import { SummaryComponent } from './summary/summary.component';


const routes: Routes = [
  {
    path: '', 
    component: LoginComponent,
  },
  { 
    path: 'login', 
    component: LoginComponent,
  },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard],
   },
  {
    path: 'device-info', 
    component: DeviceInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'review', 
    component: ReviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'summary', 
    component: SummaryComponent,
    canActivate: [AuthGuard],
  }

];
export const  AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
