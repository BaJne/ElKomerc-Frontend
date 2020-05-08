import { map } from 'rxjs/operators';
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
    if (content) { // initially setter gets called with undefined
        this.showPan = content;
    }
  }

  categories: Category[];
  articals: Artical[];
  categorySubscription: Subscription;
  isLeftPanelSticked = false;
  isLeftPanelHidden = false;
  isWindowSmall = false;

  // Logika je da se ucitaju sve kategorije za prikaz preko CategoryServisa
  constructor(
    private categoryService: CategoryService,
    private articalService: ArticalService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.onResizeWindow();
    const h = 'calc(100vh - ' + (102) + 'px)';
    this.renderer.setStyle(this.el.nativeElement, 'height', h);

    this.categories = this.categoryService.getCategories();
    // Ukoliko kategorije jos nisu ucitane pozovi observable
    if (this.categories.length === 0) {
      this.categorySubscription = this.categoryService
        .requestCategories()
        .subscribe((data: any) => {
          this.categories = data;
        });
    }

    // Potrebno ucitati artikle
    this.articalService.getArticals(1, []).subscribe(data => {
      this.articals = data['results'];
    });
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

  // Test
  onCategorySwitch(s: any) {
    console.log(s);
  }
  onSubCategorySelect(s: any) {
    this.isWindowSmall = false;
    this.onResizeWindow();
    console.log(s);
  }
}
