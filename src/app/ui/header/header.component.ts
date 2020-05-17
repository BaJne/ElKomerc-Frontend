import { Artical } from './../../models/artical.model';
import { WishListService } from './../../services/wish-list.service';
import { ArticalService } from './../../services/artical.service';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user.model';
import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartSub: Subscription;
  isAutincated: Subscription;
  artInCart: {art: Artical, num: number}[] = [];
  user: User = null;

  constructor(
    private authService: AuthService,
    public wishService: WishListService,
    public articalService: ArticalService,
    private render: Renderer2
  ) {}

  ngOnInit() {
    this.artInCart = [];
    this.isAutincated = this.authService.user.subscribe(data => {
      this.user = data;
    });
    this.cartSub = this.articalService.cart.subscribe(value => {
      if (value !== null) {
        this.artInCart = value;
      }
    });
  }
  ngOnDestroy() {
    this.isAutincated.unsubscribe();
    this.cartSub.unsubscribe();
  }
  logout() {
    this.authService.logout();
  }
}
