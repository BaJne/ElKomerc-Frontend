import { Producer, ProducerService } from './producer.service';
import { Product, ProductService } from './products.service';
import { Injectable, OnInit } from '@angular/core';


interface Artical {
  sifraArtikla: string;
  proizvod: Product;
  cena: number;
  slika: string; // Potrebno je promeniti na sliku
  dodatneSlike: string[];
  prodato: number;
  program: {
    proizvodjac: Producer;
    naziv: string;
  };
  popust: number;
  bonusPoints: number;
}

Injectable({providedIn: 'root'});
export class ArticalService implements OnInit {
  loadedArtical: Artical[];

  constructor(private productService: ProductService, private producerService: ProducerService) {}

  ngOnInit() {
    this.loadedArtical = [
      {
        sifraArtikla: '100',
        proizvod: this.productService.loadedProducts[0],
        cena: 80.90,
        slika: 'ppy3x2.5.png',
        dodatneSlike: [],
        prodato: 5,
        program: {
          proizvodjac: this.producerService.loadedProducers[1],
          naziv: 'opste',
        },
        popust: 0,
        bonusPoints: 50,
      },
      {
        sifraArtikla: '101',
        proizvod: this.productService.loadedProducts[1],
        cena: 120.90,
        slika: 'ppy5x2.5.png',
        dodatneSlike: [],
        prodato: 10,
        program: {
          proizvodjac: this.producerService.loadedProducers[1],
          naziv: 'opste',
        },
        popust: 0,
        bonusPoints: 100,
      }
    ];
  }

}
