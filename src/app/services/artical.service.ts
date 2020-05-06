import { Globals } from './globals';
import { HttpClient, HttpParams } from '@angular/common/http';
import { messagetype } from 'src/app/models/message.model';
import { MessageService } from './message.service';
import { Artical } from './../models/artical.model';
import { ProducerService } from './producer.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ArticalService {
  articalToDisplay: Artical = null;
  loadedArticals: Artical[] = [];
  cart: Artical[] = [];
  toPay = 0;

  constructor(
    private producerService: ProducerService,
    private messageService: MessageService,
    private http: HttpClient,
    private globals: Globals
  ) {
    this.articalToDisplay = JSON.parse(localStorage.getItem('toDisplay'));
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.toPay = +JSON.parse(localStorage.getItem('toPay'));
    if (this.cart === null) {
      this.cart = [];
      this.toPay = 0;
    }
  }

  // Metoda za dohvatanje proizvoda
  getArticals(subCategoryID: number, features: string[]) {
    let queryParams = new HttpParams();
    // queryParams = queryParams.append('value', v)
    queryParams = queryParams.append('sub_category_id', subCategoryID + '');
    return this.http.get(
      this.globals.location + '/api/product/articles/',
      {params: queryParams}
    );
  }

  // Metoda kojom se prosledjuje artikal radi ispisivanja njegovih detalja
  setArticalToDisplay(a: Artical) {
    localStorage.setItem('toDisplay', JSON.stringify(a));
    this.articalToDisplay = a;
  }

  addToCart(a: Artical) {
    this.cart.push(a);
    this.toPay += +a.price;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem('toPay', JSON.stringify(this.toPay));
    this.messageService.sendMessage({
      key: '',
      text: 'Uspesno ste dodali proizvod.',
      type: messagetype.succes
    });
  }
}
