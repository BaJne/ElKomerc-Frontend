import { Artical } from './../../../models/artical.model';
import { ArticalService } from './../../../services/artical.service';
import { Subscription } from 'rxjs';
import { User } from './../../../models/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { PaymentItem } from '../../../models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  user: User = null;
  cart: {art: Artical, num: number}[] = [];
  toPay = 0;
  logSub: Subscription;
  cartSub: Subscription;
  items: MenuItem[];
  activeIndex = 0;
  error = false;

  // First page
  cities: string[];
  postCodes: string[];
  address = '';
  city = '';
  post = '';
  // Last page
  note = '';
  agree = false;

  constructor(
    private authService: AuthService,
    private articalService: ArticalService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.loadUserDetails();
    this.logSub = this.authService.user.subscribe(u => {
      if (u === null || u.details === null) { return; }
      this.user = u;
      this.address = this.user.details.address;
      this.city = this.user.details.city;
      this.post = this.user.details.zip_code;
    });
    this.cartSub = this.articalService.cart.subscribe(c => {
      if(c.length === 0) {
        this.router.navigate(['/home']);
      }
      this.cart = c;
      this.toPay = this.articalService.toPay;
    });
    this.items = [
      {label: 'Adresa dostave'},
      {label: 'Način dostave'},
      {label: 'Način plaćanja'},
      {label: 'Pregled narudžbine'}
    ];
    const data = JSON.parse(localStorage.getItem('orderProggress'));
    if (data !== null) {
      this.address = data.address;
      this.city = data.city;
      this.post = data.post;
      this.note = data.note;
      this.activeIndex = data.activeIndex;
      this.agree = data.agree;
    }

  }
  ngOnDestroy() {
    this.logSub.unsubscribe();
    this.cartSub.unsubscribe();
    localStorage.removeItem('orderProggress');
  }
  proceed() {
    if (this.activeIndex === 0 && (this.post === '' || this.address === '' || this.city === '')) {
      this.error = true;
      return;
    }
    if (this.activeIndex === 3) {
      if (!this.agree) {
        return;
      }
      const paymentItems: PaymentItem[] = [];
      this.cart.forEach(value => {
        const p: PaymentItem = {
          article_id: value.art.id,
          number_of_pieces: value.num,
          item_attributes: []
        };
        paymentItems.push(p);
      });
      this.orderService.makeOrder(
        this.user.token,
        {
          address: this.address,
          city: this.city,
          zip_code: this.post,
          method_of_payment: 'PS',
          note: this.note,
          payment_items: paymentItems
        }
      );
      this.articalService.clearCart();
      this.router.navigate(['/user/orders']);
      return;
    }
    this.error = false;
    this.activeIndex++;
    localStorage.setItem('orderProggress', JSON.stringify({
      address: this.address,
      city: this.city,
      post : this.post,
      note : this.note,
      activeIndex: this.activeIndex,
      agree : this.agree
    }));
  }
  back() {
    this.activeIndex--;
  }
  change(i: number) {
    if (i < this.activeIndex) {
      this.activeIndex = i;
    }
  }

  // First page
  onCitySelected(city: string) {
    let index = 0;
    while (this.cities[index] !== city) { index++; }
    this.post = this.postCodes[index];
  }
  searchForCity(event) {
    this.authService.getCityInfo(event.query).subscribe( data => {
      this.cities = data.cities;
      this.postCodes = data.zip_codes;
    });
  }
}
