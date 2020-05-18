import { WishListService } from './wish-list.service';
import { tap, map, take } from 'rxjs/operators';
import { Globals } from './globals';
import { HttpClient, HttpParams } from '@angular/common/http';
import { messagetype } from 'src/app/models/message.model';
import { MessageService } from './message.service';
import { Artical } from './../models/artical.model';
import { ProducerService } from './producer.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticalService {
  loadedArticals: Artical[] = [];
  articalToDisplay = new BehaviorSubject<Artical>(null);
  idToDisplay: number;
  cart = new BehaviorSubject<{art: Artical, num: number}[]>([]);
  toPay = 0;

  constructor(
    private producerService: ProducerService,
    private wishList: WishListService,
    private messageService: MessageService,
    private http: HttpClient,
    private globals: Globals
  ) {
    this.articalToDisplay.next(JSON.parse(localStorage.getItem('toDisplay')));
    this.toPay = +JSON.parse(localStorage.getItem('toPay'));
    if (JSON.parse(localStorage.getItem('cart')) === null) {
      this.cart.next([]);
      this.toPay = 0;
    } else {
      this.cart.next(JSON.parse(localStorage.getItem('cart')));
    }

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

    return this.http.get(
      this.globals.location + '/api/product/articles/',
      {params: queryParams}
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
          profile_picture: art.profile_picture,
          artical_rate: art.artical_rate
        };
        if (this.wishList.wish.has(a.id)) {
          a.isOnWishList = true;
        }
        data.result.push(a);
      });
      return data;
    }));
  }
  // Metoda kojom se prosledjuje artikal radi ispisivanja njegovih detalja
  setArticalToDisplay(a: Artical) {
    this.idToDisplay = a.id;
    this.articalToDisplay.next(a);
    // localStorage.setItem('toDisplay', JSON.stringify(this.articalToDisplay.value));
    setTimeout(() => {
      this.http.get<Artical>(
        this.globals.location +
        '/api/product/articles/' + a.id
      )
      .pipe(take(1))
      .subscribe(data => {
        this.articalToDisplay.next(data);
        localStorage.setItem('toDisplay', JSON.stringify(this.articalToDisplay.value));
      });
    }, 2000);
  }

  getArtical(id: number) {
    this.idToDisplay = id;
    // localStorage.setItem('toDisplay', JSON.stringify(this.articalToDisplay.value));
    setTimeout(() => {
      this.http.get<Artical>(
        this.globals.location +
        '/api/product/articles/' + id
      )
      .pipe(take(1))
      .subscribe(data => {
        this.articalToDisplay.next(data);
        localStorage.setItem('toDisplay', JSON.stringify(this.articalToDisplay.value));
      });
    }, 2000);
  }

  addToCart(a: Artical, numOfArt: number) {
    let appeard = false;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.cart.value.length; index++) {
      if (this.cart.value[index].art.id === a.id) {
        appeard = true;
        this.cart.value[index].num += numOfArt;
        break;
      }
    }
    if (!appeard) {
      this.cart.value.push({art: a, num: numOfArt});
    }
    this.toPay += (+a.price * numOfArt);
    localStorage.setItem('cart', JSON.stringify(this.cart.value));
    localStorage.setItem('toPay', JSON.stringify(this.toPay));

    this.messageService.sendMessage({
      key: '',
      text: 'Uspešno ste dodali proizvod.',
      type: messagetype.succes
    });
    this.cart.next(this.cart.value);
  }
}
