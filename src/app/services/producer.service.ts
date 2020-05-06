import { Producer } from './../models/producer.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ProducerService {
  loadedProducers: Producer[];
  constructor() {
  }
}
