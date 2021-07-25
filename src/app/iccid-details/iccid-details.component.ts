import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { DeviceinfoService } from '../_services/deviceinfo.service';
import {Message,ChatService} from '../_services/chat.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-iccid-details',
  templateUrl: './iccid-details.component.html',
  styleUrls: ['./iccid-details.component.scss']
})
export class IccidDetailsComponent implements OnInit {


  iccidForm: FormGroup;
  esn = new FormControl();
  confirmEsn = new FormControl();
  submitted = false;
  errorCount = 0;
  iccidErrorMaxCount = 3;
  showIccid = true;
  showICCIDError = false;
  minimizeChatBot = false;

  messages: Message[] = [];
  value: string;
  issueFound: boolean;




  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private deviceinfoService: DeviceinfoService, 
    public chatService: ChatService) { }

  ngOnInit(): void {
    this.esn.setValue(localStorage.getItem('esn'));
     
    this.confirmEsn.setValue(localStorage.getItem('confirmEsn'));
    this.iccidForm = this.formBuilder.group({
      iccid: ['', [Validators.required, Validators.minLength(6)]],
      confirmIccid: ['', Validators.required],
    }, {
        validator: MustMatch('iccid', 'confirmIccid')
    });

    this.chatService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });


  }

  get f() { return this.iccidForm.controls; }

  openchatBot() {
    document.getElementById("deviceErrorCls").click();
    //document.getElementById("openChatModalBtn").click();
    document.getElementById("chatBotContainer").classList.add("show");
    this.messages = [];
    let msg = "Initial"; 
    this.chatService.getBotAnswer(msg);
  }


  next() {

    this.showICCIDError=false;
    this.submitted =true;
    if (this.iccidForm.invalid) {
      return;
  } 
    this.deviceinfoService.validateICCID(this.iccidForm.value)
    .subscribe((res) => {
      console.log('res :: ' + JSON.stringify(res));
      if (res && res.error ==0) {
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
