import { Producer } from './../models/producer.model';

export class ProducerService {
  loadedProducers: Producer[];
  constructor() {
    this.loadedProducers = [
      {
        naziv: 'Aling-conel d.o.o',
        link: 'www.aling-conel.com',
        opis: '',
        slika: ''
      },
      {
        naziv: 'Milic d.o.o',
        link: 'www.milic.com',
        opis: 'Fabrika kablova',
        slika: ''
      }
    ];
  }
}
