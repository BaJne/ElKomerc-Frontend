import { OnInit } from '@angular/core';

export interface Category {
  naziv: string;
  podKategorija: {
    naziv: string;
    osobine: {
      tipPodatka: string;
      naziv: string;
    }[];
  }[];
}

export class CategoryService {
  // Potrebno je odmah dovuci sa servera sve kategorije
  loadedCategory: Category[];

  constructor() {
    this.loadedCategory = [
      {
        naziv: 'kablovi',
        podKategorija: [
          {
            naziv: 'instalacioni',
            osobine: [
              {
                tipPodatka: 'string',
                naziv: 'oznaka'
              },
              {
                tipPodatka: 'number',
                naziv: 'broj provodnika'
              },
              {
                tipPodatka: 'number',
                naziv: 'poprecni presek'
              }
            ]
          },
          {
            naziv: 'zica',
            osobine: [
              {
                tipPodatka: 'string',
                naziv: 'oznaka'
              },
              {
                tipPodatka: 'string' ,    // Licna ili pun presek
                naziv: 'presek'
              },
              {
                tipPodatka: 'number',
                naziv: 'poprecni presek'
              }
            ]
          }
        ]
      },
      {
        naziv: 'rasveta',
        podKategorija: [
          {
            naziv: 'led',
            osobine: [
              {
                tipPodatka: 'number',
                naziv: 'snaga'
              },
              {
                tipPodatka: 'string',
                naziv: 'grlo'
              }
            ]
          },
          {
            naziv: 'fluo-cev',
            osobine: [
              {
                tipPodatka: 'number',
                naziv: 'snaga'
              },
              {
                tipPodatka: 'string' ,    // Licna ili pun presek
                naziv: 'starter'
              },
              {
                tipPodatka: 'string',
                naziv: 'duzina'
              }
            ]
          },
          {
            naziv: 'sijalica',
            osobine: [
              {
                tipPodatka: 'number',
                naziv: 'snaga'
              },
              {
                tipPodatka: 'string' ,    // Licna ili pun presek
                naziv: 'grlo'
              },
              {
                tipPodatka: 'string',
                naziv: 'oblik'
              }
            ]
          }
        ]
      }
    ];
  }

  getCategories() {
    console.log(this.loadedCategory);

    return this.loadedCategory.slice(0);
  }
}
