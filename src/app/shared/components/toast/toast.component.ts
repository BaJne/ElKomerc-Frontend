import { Message } from './../../../models/message.model';
import { MessageService } from './../../../services/message.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  messages: Message[] = [];
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.messanger.subscribe((data: Message) => {
      this.messages.push(data);
      setTimeout(() => {
        this.messages.splice(0, 1);
      }, 3000);
    });
  }

  closeBox(mm: Message) {
    const i = this.messages.findIndex( el => el === mm);
    this.messages.splice(i, 1);
  }

}
