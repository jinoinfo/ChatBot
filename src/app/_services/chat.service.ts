import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { User } from '../_models';

export class Message {

 
  constructor(public author: string, public content: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  message_key : [];
  constructor(private http: HttpClient) { }
    
    conversation = new Subject<Message[]>();
  
   
   
      
    getBotAnswer(msg: string) {
        debugger;
      const userMessage = new Message('user', msg); 
      console.log('msg from getBotAnswer.. '+userMessage.content);
      //writing the user entered message to the chat bot.
      if(userMessage.content != "Initial" && userMessage.content.indexOf('submitBy') ===-1) {
        this.conversation.next([userMessage]);
      }
       this.getBotMessage(msg).subscribe((res) => {
        console.log('res :: ' + JSON.stringify(res));
        if (res) {
          
          console.log('after response...if..');
          var botMessage = new Message('bot',res.displayMsg);
          console.log ('bot message is '+botMessage.content);
          setTimeout(()=>{
            this.conversation.next([botMessage]);
          }, 2000);

          if(userMessage.content === "Initial") {
            setTimeout(()=>{
            this.getBotAnswer( localStorage.getItem('message_key'));
          }, 5000);
          }
        } else {
          
          console.log('after response...else..');
      
          
        }
      },
      error => {
        
      });

     // const botMessage = new Message('bot', this.getBotMessage(msg));
      
    
      
    }
  
    getBotMessage(question: string): Observable<any>{

      console.log('from getBotMessage.. question is '+question);
      const headers = {'content-type': 'application/json'}    
      let chatObject = {};
      if(question === "Initial" ||  question.indexOf('submitBy')>=0) {
        chatObject = {
          messageKey: question,
          type: localStorage.getItem('type')
          
        };
        
      }else{
         chatObject = {
          messageKey: localStorage.getItem('message_key')+ '_'+question,
          type: localStorage.getItem('type')
        };
        
      }
      console.log ('chat object '+chatObject);
      var msgToService = JSON.stringify(chatObject);
      console.log ('msgToService '+msgToService);
        const url = 'http://169.57.99.218:32123/chatservice';
       //   const url = 'http://localhost:8080/chatservice';
        
      return this.http.post(url, msgToService,{'headers':headers});

  
    }

 
}
