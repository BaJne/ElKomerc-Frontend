
export interface Producer {
  naziv: string,
  link: string;
  opis: string;
  slika: string;
}

export class ProducerService {
  loadedProducers: Producer[];

  ngOnInit(): void {
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
