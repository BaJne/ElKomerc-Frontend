import { Injectable } from '@angular/core';
import { Order, OrderCreate } from '../models/order.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from './globals';
import { take, map } from 'rxjs/operators';

// TODO ERROR handling

export interface OrderSortBundle{
  page?: number,
  full_name?: string,
  date_start?: Date,
  date_end?: Date,
  order_state?: number,
  order_by?: string
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient, private globals: Globals) {}

  makeOrder(token: string, order: OrderCreate) {
    const header = new HttpHeaders()
    .append('Authorization', 'JWT ' + token);

    return this.http.post(
      this.globals.location +
      '/api/product/payment-orders/create/', order
      , {headers: header}
    );
  }

  getOrders(token: string, bundle: OrderSortBundle) {
    const header = new HttpHeaders()
      .append('Authorization', 'JWT ' + token);

    let queryParams = new HttpParams();
    if(bundle !== null){
      queryParams = this.constructQueryParams(queryParams, bundle);
    }

    return this.http.get(
      this.globals.location +
      '/api/product/payment-orders/',
      {params: queryParams, headers: header}
    ).pipe(
      take(1),
      map<Object, {orders: Order[], count: number}>
      (data => {
        console.log(data);
        return {
          orders: data['results'],
          count: data['count']
        };
      })
    );
  }

  constructQueryParams(queryParams: HttpParams, bundle: OrderSortBundle) {
    if(!!bundle.page)        queryParams = queryParams.append("page", ''+bundle.page);
    if(!!bundle.order_by)    queryParams = queryParams.append("order_by", bundle.order_by);
    if(!!bundle.full_name)   queryParams = queryParams.append("full_name", bundle.full_name);
    if(!!bundle.date_start)  queryParams = queryParams.append("date_from", bundle.date_start.toISOString());
    if(!!bundle.date_end)    queryParams = queryParams.append("date_to", bundle.date_end.toISOString());
    if(!!bundle.order_state) queryParams = queryParams.append("status", ''+bundle.order_state);

    return queryParams;
  }

  getOrder(id: number, token:string){
    const header = new HttpHeaders()
    .append('Authorization', 'JWT ' + token);
    return this.http.get(
      this.globals.location +
      '/api/product/payment-orders/' + id,
      {headers: header}
    ).pipe<Order>(take<Order>(1));
  }

}
