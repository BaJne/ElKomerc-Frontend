import { EventEmitter, ElementRef, Injectable } from '@angular/core';

@Injectable()
export class AccorditionService {
  toggled: EventEmitter<number>;
  search: EventEmitter<string>;
  appearance: string = null;
  old: number;

  constructor() {
    this.toggled = new EventEmitter<number>();
    this.search = new EventEmitter<string>();
  }

  signal(e: number, search: string) {
    // Azuriranje aktivnog taba
    this.toggled.emit(this.old);
    this.old = e;

    // prosledjivanje parametra za pretragu
    this.search.emit(search);
  }

}
