import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { DeviceinfoService } from '../_services/deviceinfo.service';
import {Message,ChatService} from '../_services/chat.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent implements OnInit {


  deviceForm: FormGroup;
  deviceEsn: string;
  targetDeviceImage: string;
  targetDeviceModel: string;
    submitted = false;
    errorCount = 0;
    iccidFailureCount =0;
    esnErrorMaxCount = 3;
    iccidErrorMaxCount =3;
    showIccid = false;
    showESNError = false;
    showICCIDError = false;
    minimizeChatBot = false;

    messages: Message[] = [];
    value: string;
    issueFound: boolean;


    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
      private router: Router, private deviceinfoService: DeviceinfoService, 
      public chatService: ChatService) { }

  ngOnInit(): void {

    this.deviceForm = this.formBuilder.group({
      esn: ['', [Validators.required, Validators.minLength(6)]],
      confirmEsn: ['', Validators.required],
      iccid: [''],
      confirmIccid: [''],
    }, {
       // validator: MustMatch('esn', 'confirmEsn'),
        validator: MustMatch('iccid', 'confirmIccid')
        
    },
        
    );

    this.chatService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });
  }

  get f() { return this.deviceForm.controls; }

    onSubmit() {
      this.submitted = true;
      this.showESNError = false;

      if (this.deviceForm.invalid) {
          return;
      } 
      this.deviceEsn = this.deviceForm.get('esn').value;
      //alert(JSON.stringify(this.deviceForm.value, null, 4));
      console.log('calling validate device');
      this.deviceinfoService.validateDevice(this.deviceForm.value)
      .subscribe((res) => {
        console.log('res :: ' + JSON.stringify(res));
        if (res && res.error !=0) {
          this.showIccid = false;
          this.errorCount++;
          if(this.errorCount > this.esnErrorMaxCount){
            console.log('Needs to invoke chat boat..');
            localStorage.setItem('message_key', res.helpDeskKey);
            localStorage.setItem('type','device');
            document.getElementById("openModalButton").click();
          } else {
            this.showESNError = true;
          }
        } else {
          localStorage.setItem('esn', this.deviceForm.get('esn').value);
          localStorage.setItem('confirmEsn', this.deviceForm.get('confirmEsn').value);
          localStorage.setItem('targetDeviceImage', res.deviceImage);
          localStorage.setItem('targetDeviceModel',res.deviceModel);
          this.targetDeviceImage=res.deviceImage;
          this.targetDeviceModel = res.deviceModel;
          console.log("success");
        //  this.router.navigate(['iccid-details']);
          this.showIccid = true;
        }
      },
      error => {
        console.log ('from error block');
      });
  }

  next() {

    const iccid= this.deviceForm.get("iccid");
    iccid.setValidators([Validators.required, Validators.minLength(10)]);

    iccid.updateValueAndValidity();
    const confirmIccid= this.deviceForm.get("confirmIccid");
    confirmIccid.setValidators([Validators.required, Validators.minLength(10)]);
    
    confirmIccid.updateValueAndValidity();
    localStorage.setItem('targetDeviceICCID',this.deviceForm.get('iccid').value);
    
    
    if (this.deviceForm.invalid) {
      console.log('ICCID form validation failed');
      return;
  } 

    this.deviceinfoService.validateICCID(this.deviceForm.value)
    .subscribe((res) => {
      console.log('res :: ' + JSON.stringify(res));
      if (res && res.error ==0) {
        this.iccidFailureCount=0;
        this.router.navigate(['review']);
      } else {
        console.log("error");
       // this.showIccid = false;
          this.iccidFailureCount++;
          if(this.iccidFailureCount > this.iccidErrorMaxCount){
            console.log('Needs to invoke chat boat for ICCID..');
            localStorage.setItem('message_key', res.helpDeskKey);
            localStorage.setItem('type','sim');
            document.getElementById("openModalButton").click();
          } else {
            this.showICCIDError =true;
          }
       
      }
    },
    error => {
      
    });
  }


  openchatBot() {
    console.log ('opening the chat bot..');
    document.getElementById("deviceErrorCls").click();
    //document.getElementById("openChatModalBtn").click();
    document.getElementById("chatBotContainer").classList.add("show");
    this.messages = [];
    let msg = "Initial"; 
    console.log('callig getBotAnswer method..');
    this.chatService.getBotAnswer(msg);
  }
  sendMessage() {
    console.log('from send message method..');
    debugger;
    this.issueFound = true;
    this.chatService.getBotAnswer(this.value);
    this.value = '';
  }

  minimixeChatBot(){
    //this.minimizeChatBot = !this.minimizeChatBot;
    document.getElementById("chatBotContainer").classList.toggle("chatbot-min");
  }

  closeChatBot(){
    document.getElementById("chatBotContainer").classList.remove("show");
  }
}
