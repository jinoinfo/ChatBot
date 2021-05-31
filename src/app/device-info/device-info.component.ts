import { Component, OnInit, Input } from '@angular/core';
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
    submitted = false;
    errorCount = 0;
    esnErrorMaxCount = 3;
    showIccid = false;
    showESNError = false;
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
    }, {
        validator: MustMatch('esn', 'confirmEsn')
    });

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

      //alert(JSON.stringify(this.deviceForm.value, null, 4));
      this.deviceinfoService.validateDevice(this.deviceForm.value)
      .subscribe((res) => {
        console.log('res :: ' + JSON.stringify(res));
        if (res && res.error) {
          this.showIccid = false;
          this.errorCount++;
          if(this.errorCount > this.esnErrorMaxCount){
            document.getElementById("openModalButton").click();
          } else {
            this.showESNError = true;
          }
        } else {
          console.log("success");
          this.showIccid = true;
        }
      },
      error => {
        
      });
  }

  openchatBot() {
    document.getElementById("deviceErrorCls").click();
    //document.getElementById("openChatModalBtn").click();
    document.getElementById("chatBotContainer").classList.add("show");
    this.messages = [];
    let msg = "Initial"; 
    this.chatService.getBotAnswer(msg, this.issueFound);
  }


  next() {
    this.deviceinfoService.validateICCID(this.deviceForm.value)
    .subscribe((res) => {
      console.log('res :: ' + JSON.stringify(res));
      if (res && res.validateIccidResponse) {
        this.router.navigate(['review']);
      } else {
        console.log("error");
      }
    },
    error => {
      
    });
  }

  sendMessage() {
    debugger;
    this.issueFound = true;
    this.chatService.getBotAnswer(this.value,this.issueFound);
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
