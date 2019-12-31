import { Component, OnInit, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {
  @Input() value: any[];

  constructor(private render: Renderer2) { }

  ngOnInit() {
  }

  onHoverIn(e: any, m: any) {
    this.render.removeClass(e, 'hidden');
    this.render.addClass(m, 'img-hover');  }
  onHoverOut(e: any, m: any) {
    this.render.addClass(e, 'hidden');
    this.render.removeClass(m, 'img-hover');
  }


}
