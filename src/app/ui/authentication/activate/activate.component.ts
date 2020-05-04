import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  status: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams.status;

    if (params === null || params === undefined ) {
      this.status = 404;
    } else if (params === '200') {
      this.status = 200;
    } else if (params === '400') {
      this.status = 400;
    } else {
      this.status = 404;
    }
  }

}
