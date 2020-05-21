import { Artical } from './../../../models/artical.model';
import { ArticalService } from './../../../services/artical.service';
import { Subscription } from 'rxjs';
import { User } from './../../../models/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(
    private authService: AuthService,
    private articalService: ArticalService
  ) { }

  ngOnInit(): void {
    this.authService.loadUserDetails();
    this.logSub = this.authService.user.subscribe(u => {
      if (u.details === null) { return; }
      this.user = u;
    });
    this.cartSub = this.articalService.cart.subscribe(data => {
      this.cart = data;
      this.toPay = this.articalService.toPay;
    });
    this.items = [
      {label: 'Adresa dostave'},
      {label: 'Način dostave'},
      {label: 'Način plaćanja'},
      {label: 'Pregled narudžbine'}
  ];
  }
  ngOnDestroy() {
    this.logSub.unsubscribe();
    this.cartSub.unsubscribe();
  }
  proceed() {
    this.activeIndex++;
  }
  back() {
    this.activeIndex--;
  }
  change(i: number) {
    if (i < this.activeIndex) {
      this.activeIndex = i;
    }
  }
}
