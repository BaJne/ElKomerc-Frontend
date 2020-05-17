import { MessageService } from './message.service';
import { messagetype } from 'src/app/models/message.model';
import { Artical } from './../models/artical.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WishListService {
  wish: Artical[];
  constructor(private messageService: MessageService) {
    this.wish = JSON.parse(localStorage.getItem('wish'));
    if (this.wish === null) {
      this.wish = [];
    }
  }

  addArticleToWishList(art: Artical) {
    if (art.isOnWishList !== undefined && art.isOnWishList !== undefined) {
      this.wish.splice(art.isOnWishList, 1);
      art.isOnWishList = undefined;
    } else {
      art.isOnWishList = this.wish.length;
      this.wish.push(art);
      localStorage.setItem('cart', JSON.stringify(this.wish));
      this.messageService.sendMessage({
        key: '',
        text: 'Proizvod je dodat u listu želja.',
        type: messagetype.succes
      });
    }
  }

  reset() {
    this.wish = [];
  }
}
