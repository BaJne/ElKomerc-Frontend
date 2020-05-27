import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class AccorditionService {
  idd = 0;
  toggled: EventEmitter<number>;
  search: EventEmitter<number>;
  appearance: string = null;
  old: number;
  opened = 0;

  constructor() {
    this.toggled = new EventEmitter<number>();
    this.search = new EventEmitter<number>();
    this.old = this.opened;
  }

  signal(e: number, search: number) {
    // Azuriranje aktivnog taba
    this.toggled.emit(this.old);
    this.old = e;

    // prosledjivanje parametra za pretragu
    this.search.emit(search);
  }
  setOpenedPage(i: number) {
    this.old = i;
    this.opened = i;
  }

}
