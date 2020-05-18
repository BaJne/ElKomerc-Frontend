import { Component, OnInit, Input } from '@angular/core';

export interface CardInput {
  img?: string;
  details?: string;
  rate?: number;
  isLiked?: boolean;
  title: string;
  price: number;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() layout;
  @Input() data: CardInput;
  constructor() { }

  ngOnInit(): void {}

}
