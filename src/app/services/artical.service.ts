import { Artical } from './../models/artical.model';
import { ProducerService } from './producer.service';
import { ProductService } from './products.service';
import { Injectable } from '@angular/core';



@Injectable({providedIn: 'root'})
export class ArticalService {
  loadedArtical: Artical[];
  articalToDisplay: Artical = null;

  constructor(private productService: ProductService, private producerService: ProducerService) {
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
      },
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
      },
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
      },
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
      },
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
      },
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
      },
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
      },
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
      },
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
      },
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

  // Metoda kojom se prosledjuje artikal radi ispisivanja njegovih detalja
  setArticalToDisplay(a: Artical) {
    this.articalToDisplay = a;
  }
  getSomeArticals(s: string) {
    // Potrebno je dohvatiti odgovarajuce artikle
    return this.loadedArtical.slice(0);
  }


}
