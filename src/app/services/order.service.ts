import { ArticalService } from './artical.service';
import { Injectable } from '@angular/core';
import { Order, OrderPreview } from '../models/order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from './globals';
import { MessageService } from './message.service';
import { messagetype } from '../models/message.model';
import { take, map } from 'rxjs/operators';

// TODO ERROR handling
@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(
    private article: ArticalService,
    private http: HttpClient,
    private messageService: MessageService,
    private globals: Globals
  ) {}

  makeOrder(
    token: string,
    order: Order
  ) {
    const header = new HttpHeaders()
    .append('Authorization', 'JWT ' + token);

    this.http.post(
      this.globals.location +
      '/api/product/payments/order/create/', order
      , {headers: header}
    ).subscribe(data => {
      this.messageService.sendMessage({
        key: '',
        text: 'Narudžbina je uspešno kreirana.',
        type: messagetype.succes
      });
      this.article.clearCart();
    },
    error => {
      this.messageService.sendMessage({
        key: '',
        text: 'Narudžbina nije uspešno kreirana. Molimo pokušajte kasnije',
        type: messagetype.succes
      });
    });
  }

  getOrders(token: string) {
    console.log(token);

    const header = new HttpHeaders()
      .append('Authorization', 'JWT ' + token);
    return this.http.get(
      this.globals.location +
      '/api/product/payments/order/',
      {headers: header}
    ).pipe(
      take(1),
      map(data => {
        let orders: OrderPreview[] = [];
        orders = data['results'];
        return orders;
      })
    );
  }

}
