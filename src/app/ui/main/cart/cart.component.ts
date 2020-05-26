import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticalService } from '../../../services/artical.service';
import { Artical } from '../../../models/artical.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: {art: Artical, num: number}[] = [];
  toPay = 0;
  cartSub: Subscription;
  constructor(
    private articalService: ArticalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartSub = this.articalService.cart.subscribe(data => {
      this.cart = data;
      this.toPay = this.articalService.toPay;
    });
  }
  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }
  remove(i: number) {
    this.articalService.removeFromCart(i);
  }
  inc(i: number) {
    this.articalService.inc(i);
  }
  dec(i: number) {
    this.articalService.dec(i);
  }
  orderRecipe() {
    if (this.cart.length === 0) { return; }
    this.router.navigate(['/order']);
  }
}
