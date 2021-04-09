import { Component, OnInit} from '@angular/core';
import { Shelf } from 'src/app/models/shelf.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  carouselData: {
    picture: string,
    title?: string,
    about?: string,
    link?: string
  }[];

  shelves: Shelf[];

  constructor(
    private shelvesService: AdminService
  ) {
    this.carouselData = [
      {
        picture: 'url("/assets/img/img1.jpg")'
      },
      {
        picture: 'url("/assets/img/img2.jpg")'
      },
      {
        picture: 'url("/assets/img/img3.jpg")'
      }
    ];
  }

  ngOnInit(): void {
    this.shelvesService.getAllShelfs().subscribe(data => {
      this.shelves = data;
    });
  }

}
