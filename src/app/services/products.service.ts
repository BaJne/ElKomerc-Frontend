import { Injectable, OnInit } from '@angular/core';

export interface Product {
    id: number;
    naziv: string;
    opis: string;
    jedinicaMere: string;
    kategorija: string;
    podkategorija: {
      naziv: string;
    }[];
    osobine: {
      naziv: string;
      vrednost: string;
    }[];
}


export class ProductService implements OnInit {
  loadedProducts: Product[];

  ngOnInit() {
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
