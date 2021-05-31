import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class Message {
  constructor(public author: string, public content: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
   
    constructor() {}
    
    conversation = new Subject<Message[]>();
  
    messageMap = {
      "Initial": "Thanks for your patience we are looking up the reason for failure. Please standby.",
      "okay": "We have observed an internal issue with our systems. If you wish to complete the transaction, I can post the transaction on your behalf using our back-end system ?",
      "proceed":"Device Swap is complete. Please restart your new mobile and should be able to enjoy our services.",
      "success" : "Good News! We found an issue with the ESN due to an internal error. I was able to resolve the issue. Please reenter the esn and retry the transaction",
      "investigate":"We need further investigation from our technical team on the issue. Once the issue is resolved we will keep you posted. Please use the Reference Number: SD123456 for any further communications on the issue",
      "default": "I can't understand. Can you please repeat"
    }

   
      
    getBotAnswer(msg: string, issueFound) {
        debugger;
      const userMessage = new Message('user', msg); 
      console.log(userMessage);
      if(userMessage.content != "Initial") {
        this.conversation.next([userMessage]);
      }
      if (issueFound) {
        msg= "okay";
        }
      else{
      msg= "investigate";
      }
      const botMessage = new Message('bot', this.getBotMessage(msg));
      
      setTimeout(()=>{
        this.conversation.next([botMessage]);
      }, 1500);
    }
  
    getBotMessage(question: string){
        debugger;
      let answer = this.messageMap[question];
      return answer || this.messageMap['default'];
    }
}
