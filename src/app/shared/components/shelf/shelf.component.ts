import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Shelf } from 'src/app/models/shelf.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {

  @Input('data') shelf: Shelf;

  responsiveOptions = [
    {
        breakpoint: '1110px',
        numVisible: 4,
        numScroll: 1
    },
    {
        breakpoint: '910px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '690px',
        numVisible: 2,
        numScroll: 1
    }
  ];

  constructor(private router: Router, private sanitizer: DomSanitizer) {
  }

  public getSafeUrl(img: string) {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + img);
  }

  ngOnInit(): void {

  }

  showProductDetails(id: number){
    console.log(id);

    this.router.navigate(['/product/', ''+id]);
  }
}
