import { Artical } from './../../../models/artical.model';
import { ArticalService } from './../../../services/artical.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  artical: Artical = null;
  constructor(private articalService: ArticalService, private route: ActivatedRoute) { }

  ngOnInit() {
    const l = this.route.snapshot.queryParams['loaded'];
    console.log(l);
    if (l === 'true') {
      this.artical = this.articalService.articalToDisplay;
    } else {
      // Odraditi odgovarajuca ucitavanja sa baze
    }
  }

}
