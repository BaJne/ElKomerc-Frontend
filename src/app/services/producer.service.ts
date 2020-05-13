import { map, tap } from 'rxjs/operators';
import { Globals } from './globals';
import { HttpClient } from '@angular/common/http';
import { Producer } from './../models/producer.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ProducerService {
  loadedProducers: Producer[] = [];
  constructor(private http: HttpClient, private globals: Globals) {}

  // Http request za dohvatanje kategorija
  requestProducers() {
    return this.http.get(this.globals.location + '/api/product/producers/')
      .pipe(map((data: any) => {
        const producers: Producer[] = [];

        data.forEach(obj => {
          console.log(obj.profile_image);
          const prod: Producer = {
            id: obj.id,
            producer_name: obj.producer_name,
            uri: obj.uri,
            producer_icon: obj.profile_image,
            sub_categories_id: []
          };

          obj.sub_categories_id.forEach(id => {
            prod.sub_categories_id.push(id);
          });

          producers.push(prod);
        });
        return producers;
      }), tap( data => {
        localStorage.setItem('producers', JSON.stringify(data));
        this.loadedProducers = data;
      }));
  }

  getProducers() {
    if (this.loadedProducers.length > 0) {
      return this.loadedProducers;
    }
    this.loadedProducers = JSON.parse(localStorage.getItem('producers'));
    return this.loadedProducers;
  }


}
