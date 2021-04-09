import { Injectable, OnDestroy } from '@angular/core';
import { Shelf } from '../models/shelf.model';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from './globals';
import { Artical } from '../models/artical.model';
import { map} from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { OrderService } from './order.service';

@Injectable({ providedIn: 'root' })
export class AdminService implements OnDestroy{
  userSubscription: Subscription;
  user: User = null;

  shelf: Shelf = undefined;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private orderService: OrderService,
    private globals: Globals
  ){
    this.userSubscription = this.authService.user.subscribe(u => {
      this.user = u;
    });
  }

  // SHELVES API
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  getAllShelfs(){
    return this.http.get(
      this.globals.location + '/api/product/article-groups'
    )
    .pipe(map<Array<any>, Shelf[]>(responseData => {
      let res: Shelf[] = [];
      responseData.forEach(el => {
        console.log(el);

        // TODO ispitati da li se elementi poklapaju
        res.push({
          id: el.id,
          title: el.group_name,
          is_enabled: true,
          products: el.articles,
          link: el.link
        })
      });
      return res;
    }));
  }

  getShelfByIndex(id: number){
    if(this.shelf !== undefined && this.shelf.id === id){
      return new Observable<Shelf>((observer)=>{
        console.log(this.shelf)
        observer.next(this.shelf);
      });
    }

    return this.http.get(
      this.globals.location + '/api/product/article-groups/' + id
    )
    .pipe(
      map<any, Shelf>(responseData => {
        // TODO ispitati da li se el. poklapaju, ne bi trebalo da zahteva autentikaciju.
        const result: Shelf = {
          id: responseData.id,
          title: responseData.group_name,
          discount: 0,
          is_enabled: true,
          products: responseData.articles,
          link: responseData.link
        };
        return result;
      }));
  }

  cacheShelfToEdit(shelf:Shelf){
    this.shelf = shelf;
  }

  makeNewShelf(){
    // title, discount, img, list of product - ID, link
  }


  // ARTICLES API
  getArticles(page?: number){
    let queryParams = new HttpParams();
    if(page != undefined){
      queryParams = queryParams
        .append('page', page + '');
    }
    // TODO ispitati novii APII kada stigne

    let header = new HttpHeaders();

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
          profile_picture: art.profile_picture,
          sub_category: 'Nije definisano',
          producer_info:{
            producer_name: 'Nije definisano',
            profile_image: '',
            uri: '',
            id: 1
          }
        };
        data.result.push(a);
      });
      return data;
    }));
  }

  // ORDERS API
  getOrders(){
    return this.orderService.getOrders(this.user?.token);
  }

}
