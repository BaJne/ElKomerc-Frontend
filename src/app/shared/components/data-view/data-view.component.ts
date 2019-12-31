import { Artical } from './../../../models/artical.model';
import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {
  @Input() value: Artical[];

  constructor(private render: Renderer2, private router: Router) { }

  ngOnInit() {
  }

  onHoverIn(e: any, m: any) {
    this.render.removeClass(e, 'hidden');
    this.render.addClass(m, 'img-hover');  }
  onHoverOut(e: any, m: any) {
    this.render.addClass(e, 'hidden');
    this.render.removeClass(m, 'img-hover');
  }
  onProductDetail() {

    this.router.navigate(['../product/'])
  }


}
