import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  @Input() images: string[];
  selected: number;
  constructor() { }

  ngOnInit(): void {
    this.selected = 0;
  }
  onSelectImg(index: number) {
    this.selected = index;
  }

}
