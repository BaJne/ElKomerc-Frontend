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
