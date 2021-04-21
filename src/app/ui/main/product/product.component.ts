import { Subscription } from 'rxjs';
import { Artical } from './../../../models/artical.model';
import { ArticalService } from './../../../services/artical.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { TransitionService } from '../../../services/transition.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  user: User = null;

  artical: Artical = null;
  images: string[] = [];
  isLoading = true;
  itemCount = 1;
  routeSub: Subscription;
  isLoadingSub: Subscription;
  displaySub: Subscription;
  addingComment = false;

  constructor(
    private articalService: ArticalService,
    private authService: AuthService,
    private transit: TransitionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
// TODO UKOLIKO ID OD ARTIKLA NIJE DOBAR LOADER SE VRTI BESKRAJNO
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(u => {
      this.user = u;
    });

    this.isLoadingSub = this.articalService.isLoadingEmmiter.subscribe(value => {
      this.isLoading = value;
    });

    this.displaySub = this.articalService.articalToDisplay
    .subscribe(data => {
      if(data === null) { return; }
      this.isLoading = false;
      this.artical = data;
      this.images = [];
      if (this.artical.article_images === undefined || this.artical.article_images.length === 0) {
        if (this.artical.profile_picture !== null && this.artical.profile_picture !== undefined) {
          this.images.push(this.artical.profile_picture);
        } else {
          this.images.push('assets/img/no-img.png');
        }
      } else {
        this.artical.article_images.forEach(img => {
          this.images.push(img.uri);
        });
      }
    });

    this.routeSub = this.route.params.subscribe(params => {
      if (
        this.articalService.idToDisplay !== +params.id
      ) {
        this.articalService.getArtical(+params.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.displaySub.unsubscribe();
    this.isLoadingSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  backToProducts() {
    this.router.navigate(['/products']);
  }
  addToCart() {
    this.articalService.addToCart(this.artical, this.itemCount);
    this.itemCount = 1;
  }

  createNewComment() {
    if (this.user === null) {
      this.transit.setLogInReturnPage(this.router.url);
      this.router.navigate(['/login/sign-in']);
      return;
    }
    this.addingComment = !this.addingComment;
  }
  saveComment() {
    // Ovde se poziva api za cuvanje komentara koji ce se kasnije odobriti od administratora
    this.addingComment = !this.addingComment;
  }
}
