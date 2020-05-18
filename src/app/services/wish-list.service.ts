import { MessageService } from './message.service';
import { messagetype } from 'src/app/models/message.model';
import { Artical } from './../models/artical.model';
import { Injectable } from '@angular/core';
import { MapType } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class WishListService {
  wish = new Map<number, Artical>();
  constructor(private messageService: MessageService) {

    this.wish = new Map(localStorage.myMap);
    if (this.wish === null) {
      this.wish = new Map<number, Artical>();
    }
  }
  addArticleToWishList(art: Artical) {
    if (this.wish.has(art.id)) {
      this.wish.delete(art.id);
      art.isOnWishList = false;
    } else {
      art.isOnWishList = true;
      this.wish.set(art.id, art);
      this.messageService.sendMessage({
        key: '',
        text: 'Proizvod je dodat u listu želja.',
        type: messagetype.succes
      });
    }

    if (this.wish.size === 0) {
      localStorage.removeItem('myMap');
    } else {
      localStorage.myMap = JSON.stringify(Array.from(this.wish.entries()));
    }
  }
  reset() {
    this.wish = new Map<number, Artical>();
  }
}
