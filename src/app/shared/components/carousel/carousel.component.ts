import { Component, OnInit, Input, OnChanges, Renderer2, ElementRef, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnChanges {
  @ViewChildren('main') mainContainer;
  @Input() show;
  toShow: boolean;
  timer;
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.toShow = false;
  }

  ngOnChanges(): void {

    if (!this.show) {
      if (this.mainContainer === undefined) { return; }

      this.renderer.addClass(this.mainContainer.first.nativeElement, 'main-out');
      this.timer = setTimeout(() => {
        this.renderer.removeClass(this.mainContainer.first.nativeElement, 'main-out');
        this.toShow = false;
        this.timer = undefined;
      }, 1000);
      return;
    }

    if (this.timer !== undefined) {
      clearTimeout(this.timer);
      this.renderer.removeClass(this.mainContainer.first.nativeElement, 'main-out');
      this.toShow = false;
      this.timer = undefined;
    }
    this.toShow = true;
  }

}
