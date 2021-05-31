import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  env= environment;

  constructor(private router: Router,private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }
  logout(){
    debugger;
    this.authenticationService.logoutMethod();
    this.env.isLoggedin=false;
  }

}
