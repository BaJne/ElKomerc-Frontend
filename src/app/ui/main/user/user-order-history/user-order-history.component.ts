import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../../services/auth.service';
import { OrderService } from '../../../../services/order.service';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.css']
})
export class UserOrderHistoryComponent implements OnInit, OnDestroy {
  isAutenticated: Subscription;
  user: User = null;
  orders: Order[] = [];

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.isAutenticated = this.authService.user.subscribe(u => {
      this.user = u;
      if (u === null) { return; }
      this.orderService.getOrders(u.token, null).subscribe(data => {
        this.orders = data.orders;
      });
    });
  }
  ngOnDestroy() {
    this.isAutenticated.unsubscribe();
  }

}
