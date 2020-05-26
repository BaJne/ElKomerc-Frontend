import { Artical } from './../../models/artical.model';
import { WishListService } from './../../services/wish-list.service';
import { ArticalService } from './../../services/artical.service';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user.model';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartSub: Subscription;
  isAutincated: Subscription;
  wishItemsSub: Subscription;
  artInCart: {art: Artical, num: number}[] = [];
  wishArticals = 0;
  amountToPay = 0;
  user: User = null;

  constructor(
    private authService: AuthService,
    private wishService: WishListService,
    private articalService: ArticalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.artInCart = [];
    this.wishItemsSub = this.wishService.artNum.subscribe(value => {
      this.wishArticals = value;
    });

    this.isAutincated = this.authService.user.subscribe(data => {
      this.user = data;
    });

    this.cartSub = this.articalService.cart.subscribe(value => {
      this.amountToPay = 0;
      if (value !== null) {
        this.artInCart = value;
        this.amountToPay = this.articalService.toPay;
      }
    });
  }
  ngOnDestroy() {
    this.isAutincated.unsubscribe();
    this.cartSub.unsubscribe();
    this.wishItemsSub.unsubscribe();
    console.log('Unisten header');
  }
  navigate(b: boolean) {
    if (b) {
      this.router.navigate(['/order']);
    } else {
      this.router.navigate(['/cart']);
    }
  }
  removeItem(index: number) {
    this.articalService.removeFromCart(index);
  }
  logout() {
    this.authService.logout();
  }
}
