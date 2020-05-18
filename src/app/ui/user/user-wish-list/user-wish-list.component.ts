import { CardInput } from './../../../shared/components/card/card.component';
import { Artical } from './../../../models/artical.model';
import { WishListService } from './../../../services/wish-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-wish-list',
  templateUrl: './user-wish-list.component.html',
  styleUrls: ['./user-wish-list.component.css']
})
export class UserWishListComponent implements OnInit {
  art: CardInput[];
  constructor(
    private wishService: WishListService
  ) { }

  ngOnInit(): void {
    this.art = [];
    this.wishService.wish.forEach(value => {
      const a: CardInput = {
        title: value.article_name,
        price: value.price,
        img: value.profile_picture,
        rate: value.artical_rate,
        isLiked: true
      };
      this.art.push(a);
    });

  }

}
