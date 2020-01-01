import { Artical } from './../models/artical.model';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { messagetype } from '../models/message.model';

@Injectable({providedIn: 'root'})
export class UserService {
  addedArticals: Artical[] = [];
  toPay = 0;
  constructor(private messageService: MessageService) {}

  addToCart(a: Artical) {
    this.addedArticals.push(a);
    this.toPay += a.cena;
    this.messageService.sendMessage({key: '', text: 'Uspesno ste dodali proizvod.', type: messagetype.succes});
  }
}
