import { User } from './../models/user.model';
import { AuthService } from './auth.service';
import { WishListService } from './wish-list.service';
import { tap, map, take } from 'rxjs/operators';
import { Globals } from './globals';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { messagetype } from 'src/app/models/message.model';
import { MessageService } from './message.service';
import { Artical } from './../models/artical.model';
import { ProducerService } from './producer.service';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticalService implements OnDestroy {
  userSubscription: Subscription;
  user: User = null;

  loadedArticals: Artical[] = [];
  articalToDisplay = new BehaviorSubject<Artical>(null);
  isLoadingEmmiter = new BehaviorSubject<boolean>(null);
  cart = new BehaviorSubject<{art: Artical, num: number}[]>([]);
  idToDisplay: number;
  toPay = 0;

  constructor(
    private producerService: ProducerService,
    private authService: AuthService,
    private wishList: WishListService,
    private messageService: MessageService,
    private http: HttpClient,
    private globals: Globals
  ) {
    this.userSubscription = this.authService.user.subscribe(u => {
      // TODO Update cart with new discounts
      // TODO Update toDisplay article price
      this.user = u;
    });
    const art = JSON.parse(localStorage.getItem('toDisplay'));
    if (art !== null) {
      this.articalToDisplay.next(art);
      this.idToDisplay = this.articalToDisplay.value.id;
      this.toPay = +JSON.parse(localStorage.getItem('toPay'));
    }

    const tempCart = JSON.parse(localStorage.getItem('cart'));
    if ( tempCart === null) {
      this.cart.next([]);
      this.toPay = 0;
    } else {
      this.cart.next(tempCart);
    }
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  // Metoda za dohvatanje proizvoda
  getArticals(subCategoryID: number, features: string[], page: number, idProducer: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append('sub_category_id', subCategoryID + '')
      .append('page', page + '');
    features.forEach(value => {
      queryParams = queryParams.append('value', value);
    });
    if (idProducer !== -1) {
      queryParams = queryParams.append('producer', idProducer + '');
    }
    let header = new HttpHeaders();
    if (this.user !== null) {
      header = header.append('Authorization', 'JWT ' + this.user.token);
    }
    return this.http.get(
      this.globals.location + '/api/product/articles/',
      {params: queryParams, headers: header}
    )
    .pipe(map(responseData => {
      const data: {count: number, result: Artical[]} = {count: responseData['count'], result: []};
      responseData['results'].forEach(art => {
        const a: Artical = {
          id: art.id,
          article_code: art.article_code,
          article_name: art.article_name,
          price: art.price,
          uri: art.uri,
          isOnWishList: false,
          user_discount: art.user_discount,
          profile_picture: art.profile_picture,
          article_rate: art.article_rate
        };
        if (this.wishList.wish.has(a.id)) {
          a.isOnWishList = true;
        }
        data.result.push(a);
      });
      return data;
    }));
  }

  updateArtical(s: Observable<Artical>) {
    s.subscribe(data => {
      this.articalToDisplay.next(data);
      this.isLoadingEmmiter.next(false);
      localStorage.setItem('toDisplay', JSON.stringify(this.articalToDisplay.value));
    });
  }

  // Metoda kojom se prosledjuje artikal radi ispisivanja njegovih detalja
  setArticalToDisplay(a: Artical) {
    this.idToDisplay = a.id;
    this.articalToDisplay.next(a);
    this.isLoadingEmmiter.next(true);
    let header = new HttpHeaders();
    if (this.user !== null) {
      header = header.append('Authorization', 'JWT ' + this.user.token);
    }
    this.updateArtical(
      this.http.get<Artical>(
        a.uri,
        {headers: header}
      ).pipe(take(1))
    );
  }

  // Dohvati Artikal po ID
  getArtical(id: number) {
    this.idToDisplay = id;
    this.isLoadingEmmiter.next(true);

    let header = new HttpHeaders();
    if (this.user !== null) {
      header = header.append('Authorization', 'JWT ' + this.user.token);
    }
    this.updateArtical(
      this.http.get<Artical>(
        this.globals.location +
        '/api/product/articles/' + id,
        { headers: header }
      )
      .pipe(take(1))
    );
  }

  updateCart(amount: number, shwMsg: boolean) {
    this.toPay += amount;
    localStorage.setItem('cart', JSON.stringify(this.cart.value));
    localStorage.setItem('toPay', JSON.stringify(this.toPay));
    if (shwMsg) {
      this.messageService.sendMessage({
        key: '',
        text: 'Uspešno ste dodali proizvod.',
        type: messagetype.succes
      });
    }
    this.cart.next(this.cart.value);
  }

  addToCart(a: Artical, numOfArt: number) {
    let appeard = false;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.cart.value.length; index++) {
      if (this.cart.value[index].art.id === a.id) {
        appeard = true;
        const art = this.cart.value[index].art;
        this.cart.value[index].num += numOfArt;
        this.updateCart(
          (art.price - (art.price * art.user_discount / 100)) * numOfArt,
          true
        );
        break;
      }
    }
    if (!appeard) {
      // TODO ako je ruta product nije potreban http
      let header = new HttpHeaders();
      if (this.user !== null) {
        header = header.append('Authorization', 'JWT ' + this.user.token);
      }

      this.http.get<Artical>(
        this.globals.location +
        '/api/product/articles/' + a.id,
        {headers: header}
      )
      .pipe(take(1))
      .subscribe(data => {
        this.cart.value.push({art: data, num: numOfArt});
        this.updateCart((data.price - (data.price * data.user_discount / 100)) * numOfArt, true);
      });
    }
  }

  removeFromCart(index: number) {
    const item = this.cart.value[index];
    this.cart.value.splice(index, 1);
    this.updateCart(
      -(item.num * (item.art.price - item.art.price * item.art.user_discount / 100)), false
    );
  }
  inc(i: number) {
    const item = this.cart.value[i];
    item.num++;
    this.updateCart(item.art.price - item.art.price * item.art.user_discount / 100, false);
  }
  dec(i: number) {
    const item = this.cart.value[i];
    if (item.num === 1) { return; }
    item.num--;
    this.updateCart(-(item.art.price - item.art.price * item.art.user_discount / 100), false);
  }
  clearCart() {
    this.toPay = 0;
    this.cart.next([]);
    localStorage.removeItem('cart');
    localStorage.removeItem('toPay');
  }
}
