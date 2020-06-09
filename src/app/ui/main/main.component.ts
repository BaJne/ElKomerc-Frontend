import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  showFooter: boolean;
  routeSub: Subscription;
  constructor(
    private router: Router
  ) {
    if (this.router.url === '/products') {
      this.showFooter = false;
    } else {
      this.showFooter = true;
    }
  }

  ngOnInit() {
    this.routeSub = this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (
        this.router.url === '/products' &&
        this.showFooter
      ) {
        this.showFooter = false;
      } else if (
        this.router.url !== '/products' &&
        !this.showFooter
      ) {
        this.showFooter = true;
      }

    });
    // this.routeSub = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     if (this.router.url === '/product') {

    //     }
    //     console.log(this.router.url);
    //   }
    // });
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
