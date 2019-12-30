import { Producer } from './producer.model';
import { Product } from './product.model';

export interface Artical {
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
