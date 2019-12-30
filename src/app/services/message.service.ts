import { Message } from './../models/message.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MessageService {
  messanger: Subject<Message>;

  constructor() {
    this.messanger = new Subject<Message>();
  }

  sendMessage(m: Message) {
    this.messanger.next(m);
  }

}
