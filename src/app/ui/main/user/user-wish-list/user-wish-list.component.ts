
import { Component, OnInit } from '@angular/core';
import { WishListService } from '../../../../services/wish-list.service';
import { CardInput } from '../../../../shared/components/card/card.component';
import { Subject } from 'rxjs';

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
        rate: value.article_rate,
        isLiked: true
      };
      this.art.push(a);
    });

  }

}
