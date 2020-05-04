import {
  Component,
  OnInit,
  Input,
  ElementRef,
  Renderer2,
  ViewChild
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isNumber } from 'util';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  // ULAZNI PARAMETRI

  // Niz objekata koji se dostavljaju tabeli radi njihovog prikazivanja
  @Input() value: Array<any>;
  @Input() dataAjax: Observable<any>;
  // nazivi atributa koji ce se prikazivati po kolonama
  @Input() names;
  // nazivi Kolona
  @Input() header;
  // Atribut iz koje kolone ce se koristiti za search
  @Input() search;

  dataToDisplay: Array<any>;
  oldElement: ElementRef = null;

  // Search input
  @ViewChild('s', {static: true}) searchString: ElementRef;

  // Paginator bottom
  @ViewChild('select', {static: true}) sel: ElementRef;
  selectValue: number;
  currentPage: number;
  elLength: number;

  isPageChanged: boolean;

  sortInformation: {
    i: number;
    asc: boolean;
    icon: ElementRef;
  } = null;

  constructor(private sanitizer: DomSanitizer, private r: Renderer2) { }

  ngOnInit() {
    if (this.value !== undefined) {
      this.isPageChanged = false;
      this.update();
    }
    if (this.dataAjax !== undefined) {
      this.dataAjax.subscribe(data => {
        this.value = data;
        this.isPageChanged = false;
        this.update();
      });
    }
  }

  update() {
    this.elLength = 0;
    if (!this.isPageChanged) {
      this.currentPage = 1;
    }
    this.isPageChanged = false;

    this.dataToDisplay = this.value
      .filter(this.stringSearch.bind(this))
      .filter(this.changeSel.bind(this));
  }

  stringSearch(data: any) {
    const str = this.searchString.nativeElement.value;
    if (data[this.names[this.search]].toLowerCase().includes(str.toLowerCase())) {
      this.elLength++;
      return data;
    }
  }

  changeSel(data: any, index: number) {
    this.selectValue = +this.sel.nativeElement.value;
    console.log((this.currentPage - 1) * this.selectValue + 1);
    console.log(this.currentPage  * this.selectValue + this.selectValue - 1);

    if (
      index + 1 >= (this.currentPage - 1) * this.selectValue + 1 &&
      index + 1 <= (this.currentPage - 1) * this.selectValue + this.selectValue
    ) {
      return data;
    }
  }

  changePage(isUp: boolean) {
    let maxPages = Math.floor(this.elLength / this.selectValue);
    if (maxPages !== this.elLength / this.selectValue) {
      maxPages++;
    }
    if (this.currentPage === 1 && !isUp ||
         this.currentPage === maxPages && isUp) {
      return;
    }
    this.currentPage = (isUp) ? this.currentPage + 1 : this.currentPage - 1;
    this.isPageChanged = true;
    this.update();
  }

  firstPage() {
    this.currentPage = 1;
    this.isPageChanged = true;
    this.update();
  }

  lastPage() {
    this.currentPage = Math.floor(this.elLength / this.selectValue);
    if (this.currentPage !== this.elLength / this.selectValue) {
      this.currentPage++;
    }
    this.isPageChanged = true;
    this.update();
  }

  // Sortiranje
  sort(index: number, dataType: string, el: ElementRef) {
    // privremeno
    if (dataType === 'none') {
      return;
    }

    if (this.sortInformation === null || this.sortInformation.i !== index) {
      if (this.sortInformation !== null) {
        this.r.removeClass(this.sortInformation.icon, 'fa-caret-up');
        this.r.removeClass(this.sortInformation.icon, 'fa-caret-down');
        this.r.addClass(this.sortInformation.icon, 'fa-sort');
      }
      this.sortInformation = {i: index, asc: true, icon: el};
      this.r.removeClass(el, 'fa-sort');
      this.r.addClass(el, 'fa-caret-down');
    } else {

      this.r.removeClass(this.sortInformation.icon,
         (this.sortInformation.asc ? 'fa-caret-down' : 'fa-caret-up'));
      this.r.addClass(this.sortInformation.icon,
        (this.sortInformation.asc ? 'fa-caret-up' : 'fa-caret-down'));

      this.sortInformation.asc = !this.sortInformation.asc;
    }

    this.value.sort((a, b) => {
      const first = (this.sortInformation.asc) ? a : b;
      const second = (this.sortInformation.asc) ? b : a;
      switch (dataType) {
        case 'number':
          return first[this.names[index]] - second[this.names[index]];
        case 'string':
          return (first[this.names[index]]).localeCompare(second[this.names[index]]);
        default:
        case 'none': {
          return 0;
        }
      }
    });
    this.update();
  }
  // Parsira ulazne parametre i na osnovu njih vraca DOM objekat koji se prikazuje na stranici
  parse(o: any, con: string) {
    let result = '';
    const tem =
    `
      <span style="%s%"> %m% </span>
    `;

    const arr = con.split(',').map( item => {
      return item.trim();
    });
    for (const i of arr) {
      const att = i.split('.');
      let temp = o;
      for (const a of att) {
        temp = temp[a];
      }
      let b = tem.replace('%m%', temp);
      const ss = `
        font-size:9px;
        padding: 2px 4px;
        background-color: white;
        border-radius: 10px;
        display:flex;
        align-items:center;
      `;
      b = (isNumber(temp)) ? (b.replace('%s%', ss)) : (b.replace('%s%', 'color: white'));
      result += b;
    }

    const template =
     `<div style="
        display: flex;
        background-color: green;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        gap: 15px;
        padding: 5px 10px;
        font-size: 12px;
        border-radius: 10px;
        "
      >
      ${result}
    </div>`;
    return this.transform(template);
  }
  transform(v: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(v);
  }
}

// * PRIMER KORISCENJA */

// <app-data-table
//   [value]="category"
//   [names]="[
//     'naziv',
//     {columnName: 'podKategorije', style: 2, content: 'naziv, osobine.length'}
//   ]"
//   [header] = "[
//     {name: 'Naziv Kategorije', sort: 'string'},
//     {name: 'Podkategorija', sort: 'none'}
//   ]"
//    [search]="0"
// ></app-data-table>
