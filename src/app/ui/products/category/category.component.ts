import { ProducerService } from './../../../services/producer.service';
import { Producer } from './../../../models/producer.model';
import { Subscription } from 'rxjs';
import { CategoryService } from './../../../services/category.service';
import { Category, Feature } from './../../../models/category.model';
import { ArticalService } from './../../../services/artical.service';
import { Artical } from './../../../models/artical.model';

import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  @ViewChild('leftRef', {static: true}) el: ElementRef;
  @ViewChild('content', {static: true}) con: ElementRef;
  showPan: ElementRef;
  wasInside = false;
  @ViewChild('showPanel') set content(content: ElementRef) {
    if (content) { this.showPan = content; }
  }

  // Filter sort
  filter: {label: string, value: number}[];
  selectedFilter: string = null;

  // Proizvodjaci, Kategorije i Artikli
  producers: Producer[];
  allCategories: Category[];
  articals: Artical[];

  // Parametri
  categories: Category[];
  selectedProducer: Producer = null;
  selectedSubcategory = 1;
  currentPage = 1;
  maxPage: number;

  categorySubscription: Subscription;

  showProducers = false;
  isLeftPanelSticked = false;
  isLeftPanelHidden = false;
  isWindowSmall = false;

  // Logika je da se ucitaju sve kategorije za prikaz preko CategoryServisa
  constructor(
    private categoryService: CategoryService,
    private producerService: ProducerService,
    private articalService: ArticalService,
    private renderer: Renderer2
  ) {
    this.filter = [
      {label: 'Ceni Opadajuce', value: 0 },
      {label: 'Ceni Rastuće',   value: 0 },
      {label: 'Proizvođaču',    value: 0 }
    ];
  }

  ngOnInit() {
    this.onResizeWindow();
    const h = 'calc(100vh - ' + (102) + 'px)';
    this.renderer.setStyle(this.el.nativeElement, 'height', h);

    this.allCategories = this.categoryService.getCategories();
    this.producers = this.producerService.getProducers();
    if (this.allCategories === null) {
      this.categorySubscription = this.categoryService
        .requestCategories()
        .subscribe((data: any) => {
          this.allCategories = data;
          this.updateCategories();
      });
    }
    if (this.producers === null) {
      this.producerService.requestProducers().subscribe(data => {
        this.producers = data;
      });
    }
    this.updateCategories();
    this.getArticals(this.selectedSubcategory, [], 1, this.selectedProducer);
  }

  onShowProducers() {
    this.showProducers = !this.showProducers;
  }
  // Updejtovanje kategorija i prikaza
  selectGroup(index: number) {
    this.showProducers = !this.showProducers;
    if (index !== -1) {
      this.selectedProducer = this.producers[index];
    } else {
      this.selectedProducer = null;
    }
    this.updateCategories();

    this.getArticals(
      (this.selectedProducer === null) ? 1 : this.selectedProducer.sub_categories_id[0],
      [],
      1,
      this.selectedProducer
    );
  }

  // Test
  onCategorySwitch(s: any) {
  }

  onSubCategorySelect(id: any) {
    this.isWindowSmall = false;
    this.onResizeWindow();
    if (id !== this.selectedSubcategory) {
      this.selectedSubcategory = id;
      this.getArticals(this.selectedSubcategory, [], 1, this.selectedProducer);
    }
  }
  // PAGING
  next(isNext: boolean) {
    if (
      (this.currentPage === 1 && !isNext) ||
      (this.currentPage === this.maxPage && isNext)
    ) {
      return;
    }
    if (isNext) { this.nextPage(); } else { this.prevPage(); }

    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 200);
  }

  prevPage() {
    if (this.currentPage === 1) { return; }
    this.getArticals(this.selectedSubcategory, [], --this.currentPage, this.selectedProducer);
  }

  nextPage() {
    if (this.currentPage === this.maxPage) { return; }
    this.getArticals(this.selectedSubcategory, [], ++this.currentPage, this.selectedProducer);
  }

  getArticals(id: number, params: string[], page: number, producer: Producer) {
    this.articalService
      .getArticals(this.selectedSubcategory, [], page, producer === null ? -1 : producer.id)
      .subscribe((data) => {
        const count = 'count'; const results = 'results';

        this.currentPage = page;
        this.maxPage = Math.floor(data[count] / 20);
        if (data[count] % 20 !== 0 || data[count] === 0) {
          this.maxPage++;
        }
        this.articals = data[results];
      });
  }

  // Updejtovanje kategoriaj u zavisnosti od prodjuzera i search dugmeta koje jos uvek treba uraditi
  updateCategories() {
    if (this.selectedProducer === null) {
      this.categories = this.allCategories;
    } else {  // FILTER
      this.categories = [];
      let j = 0;

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.allCategories.length; i++) {
        const tempCategory: Category = {
          id: this.allCategories[i].id,
          category_name: this.allCategories[i].category_name,
          sub_categories: []
        };

        const lastSubCategory = this.allCategories[i].sub_categories[this.allCategories[i].sub_categories.length - 1];
        while (
          j < this.selectedProducer.sub_categories_id.length &&
          this.selectedProducer.sub_categories_id[j] <= lastSubCategory.id
        ) {
          const m = this.selectedProducer.sub_categories_id[j] - this.allCategories[i].sub_categories[0].id;
          tempCategory.sub_categories.push(this.allCategories[i].sub_categories[m]);
          j++;
        }
        if (tempCategory.sub_categories.length !== 0) {
          this.categories.push(tempCategory);
        }
        if (j >= this.selectedProducer.sub_categories_id.length) { break; }
      }
      // this.selectedSubcategory = this.categories[0].sub_categories[0].id;
    }
  }
  ngOnDestroy() {
    if (this.categorySubscription !== undefined) {
      this.categorySubscription.unsubscribe();
    }
  }

  // EVENT LISTENERS
  @HostListener('window:resize', ['$event'])
    onResize(event) {

      this.onResizeWindow();
      if (!this.isLeftPanelSticked) {
        const h = 'calc(100vh - ' + (this.con.nativeElement.getBoundingClientRect().top) + 'px)';
        this.renderer.setStyle(this.el.nativeElement, 'height', h);
      }
  }
  @HostListener('click', ['$event'])
    clickInside(event) {
      if (this.showPan !== undefined && this.showPan.nativeElement.contains(event.target)) {
        this.wasInside = true;
      }
  }
  @HostListener('document:click', ['$event'])
    clickHandler(event) {
      if (
        !this.el.nativeElement.contains(event.target) &&
        !this.wasInside &&
        window.innerWidth < 670 &&
        !this.isLeftPanelHidden
      ) {
        this.onToggleLeftPanel();
      }
      this.wasInside = false;
  }
  @HostListener('window:scroll', ['$event'])
    scrollHandler(event) {
      const scrollY = window.pageYOffset;
      const treshold = this.con.nativeElement.getBoundingClientRect().top + scrollY;

      if (scrollY > treshold && !this.isLeftPanelSticked) {   // Left menu se fixira
        this.isLeftPanelSticked = true;
        this.renderer.removeClass(this.el.nativeElement, 'left-panel-relative');
        this.renderer.addClass(this.el.nativeElement, 'left-panel-fixed');
        this.renderer.setStyle(this.el.nativeElement, 'height', 'calc(100vh - 1px)');
        const ml = (this.isLeftPanelHidden) ? '0px' : '280px';
        this.renderer.setStyle(this.con.nativeElement, 'margin-left', ml);
      }

      if (scrollY <= treshold) {
        const h = 'calc(100vh - ' + (treshold - scrollY) + 'px)';
        this.renderer.setStyle(this.el.nativeElement, 'height', h);

        if (this.isLeftPanelSticked) {   // Vraca u pocetni polozaj
          this.isLeftPanelSticked = false;
          this.renderer.removeClass(this.el.nativeElement, 'left-panel-fixed');
          this.renderer.addClass(this.el.nativeElement, 'left-panel-relative');
          this.renderer.setStyle(this.con.nativeElement, 'margin-left', '0px');
        }
      }
  }

  onResizeWindow() {// Dodati klase za menjanje pozicije datasheet
    if ( window.innerWidth >= 670 && this.isWindowSmall) {
      this.isWindowSmall = false;
      this.renderer.setStyle(this.con.nativeElement, 'margin-left', '0px');
      if (this.isLeftPanelHidden) {
        this.onToggleLeftPanel();
      }
    } else if (window.innerWidth < 670 && !this.isWindowSmall) {
      this.isWindowSmall = true;
      this.renderer.setStyle(this.con.nativeElement, 'margin-left', '0px');
      if (!this.isLeftPanelHidden) {
        this.onToggleLeftPanel();
      }
    }
  }
  onToggleLeftPanel() {
    this.isLeftPanelHidden = !this.isLeftPanelHidden;
    if (this.isLeftPanelHidden) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.con.nativeElement, 'margin-left', '0px');
    } else {
      const ml = (this.isLeftPanelSticked) ? '280px' : '0px';
      this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
      this.renderer.setStyle(this.con.nativeElement, 'margin-left', ml);
    }
  }

}
