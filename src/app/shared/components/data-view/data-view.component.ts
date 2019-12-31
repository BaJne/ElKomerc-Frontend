import { ArticalService } from './../../../services/artical.service';
import { Artical } from './../../../models/artical.model';
import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {
  @Input() value: Artical[];

  constructor(private articalService: ArticalService,
              private render: Renderer2,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onHoverIn(e: any, m: any) {
    this.render.removeClass(e, 'hidden');
    this.render.addClass(m, 'img-hover');  }
  onHoverOut(e: any, m: any) {
    this.render.addClass(e, 'hidden');
    this.render.removeClass(m, 'img-hover');
  }

  onProductDetail(el: Artical) {
    this.articalService.setArticalToDisplay(el);
    this.router.navigate(['../product/', el.sifraArtikla],
                {relativeTo: this.route, queryParams: {loaded: true}});
  }


}
