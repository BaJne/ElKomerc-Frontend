import { Globals } from './globals';
import { Category, Feature } from './../models/category.model';
import { HttpClient } from '@angular/common/http';
import { OnDestroy, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class CategoryService implements OnDestroy {
  categorySubscription: Subscription;
  loadedCategory: Category[] = [];

  constructor(private http: HttpClient, private globals: Globals) {

  }
  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
  }

  // Http request za dohvatanje kategorija
  requestCategories() {
    return this.http.get(this.globals.location + '/api/product-category/categories/')
      .pipe(map((data: any) => {
        const catData: Category[] = [];

        data.forEach(myObject => {
          const categoryObj: Category = {
            id: myObject.id,
            category_name: myObject.category_name,
            sub_categories: []
          };

          myObject.sub_categories.forEach(subCategory => {
            const sub_category = {
              id: subCategory.id,
              subcategory_name: subCategory.sub_category_name
            };
            categoryObj.sub_categories.push(sub_category);
          });

          catData.push(categoryObj);
        });

        return catData;
      }), tap( data => {
        localStorage.setItem('categories', JSON.stringify(data));
        this.loadedCategory = data;
      }));
  }

  getCategories() {
    if(this.loadedCategory.length > 0) {
      return this.loadedCategory;
    }
    this.loadedCategory = JSON.parse(localStorage.getItem('categories'));
    return this.loadedCategory;
  }
}
