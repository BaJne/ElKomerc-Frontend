import { Subscription } from 'rxjs';
import { Artical } from './../../../models/artical.model';
import { ArticalService } from './../../../services/artical.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  artical: Artical = null;
  images: string[] = [];
  itemCount = 1;
  private routeSub: Subscription;

  constructor(private articalService: ArticalService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {

      if (
        this.articalService.articalToDisplay !== null &&
        this.articalService.articalToDisplay.id === +params.id
      ) {
        this.artical = this.articalService.articalToDisplay;
        if (this.artical.article_images === undefined) {
          this.images.push('assets/img/no-img.png');
        } else {
          this.artical.article_images.forEach(data => {
            this.images.push(data.uri);
          });
        }
      } else {
        // Zahtev ka serveru
      }
    });

  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
  backToProducts() {
    this.router.navigate(['../../products/all'], {relativeTo: this.route});
  }

}
