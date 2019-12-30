import { Product } from './../models/product.model';

export class ProductService {
  loadedProducts: Product[];

  constructor() {
    // Pocetna test inicijalizacija
    this.loadedProducts = [
      {
        id: 0,
        naziv: 'PP-Y 3x2.5',
        opis: 'Kabal koji se koristi za instalacije.',
        jedinicaMere: 'm',
        kategorija: 'kablovi',
        podkategorija: [
          {naziv: 'instalacioni'}
        ],
        osobine : [
          {
            naziv: 'presek',
            vrednost: '3x2.5'
          },
          {
            naziv: 'tip',
            vrednost: 'PPY'
          },
        ]
      },
      {
        id: 0,
        naziv: 'PP-Y 5x2.5',
        opis: 'Kabal koji se koristi za instalacije.',
        jedinicaMere: 'm',
        kategorija: 'kablovi',
        podkategorija: [
          {naziv: 'instalacioni'}
        ],
        osobine : [
          {
            naziv: 'presek',
            vrednost: '5x2.5'
          },
          {
            naziv: 'tip',
            vrednost: 'PPY'
          },
        ]
      }
    ];
  }

}
