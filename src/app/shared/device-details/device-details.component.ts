import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {

  currentDeviceImage: string;
  currentPhone: string;
  currentDeviceModel: string;
  currentDeviceSerialNo: string;
   currentDeviceIccid: string;

  targetDeviceImage: string;
  targetDeviceModel: string;
  targetDeviceSerialNo: string;
  targetDeviceIccid: string;

  constructor() { }

  ngOnInit(): void {

    this.currentDeviceImage= localStorage.getItem('deviceImage');
    this.currentPhone= localStorage.getItem('phone');
    this.currentDeviceModel = localStorage.getItem('deviceModel');
    this.currentDeviceSerialNo = localStorage.getItem('currentDeviceSerialNo');
    this.currentDeviceIccid = localStorage.getItem('currentDeviceIccid');
   
    this.targetDeviceImage= localStorage.getItem('targetDeviceImage');
    this.targetDeviceModel = localStorage.getItem('targetDeviceModel');
    this.targetDeviceSerialNo = localStorage.getItem('esn');
    this.targetDeviceIccid= localStorage.getItem('targetDeviceICCID');


  }
 

}
