import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  deviceImage: string;
  deviceModel: string;
  currentDevicePhone: string;

  constructor() { }

  ngOnInit(): void {

    this.deviceImage= localStorage.getItem('deviceImage');
    this.deviceModel = localStorage.getItem('deviceModel')
    this.currentDevicePhone = localStorage.getItem('phone');
  }

}
