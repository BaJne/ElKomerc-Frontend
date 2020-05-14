import { Message } from './../../../models/message.model';
import { MessageService } from './../../../services/message.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  msgToExpire: Message[] = [];
  msgToHold: Message[] = [];
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.messanger.subscribe((data: Message) => {
      if (data.key === 'hold') {
        this.msgToHold.push(data);
      } else {
        this.msgToExpire.push(data);
        setTimeout(() => {
          this.msgToExpire.splice(0, 1);
        }, 3000);
      }
    });
  }

  closeBox(mm: Message, ind: boolean) {
    if (!ind) {
      const i = this.msgToHold.findIndex( el => el === mm);
      this.msgToHold.splice(i, 1);
    } else {
      const i = this.msgToHold.findIndex( el => el === mm);
      this.msgToExpire.splice(i, 1);
    }
  }

}
