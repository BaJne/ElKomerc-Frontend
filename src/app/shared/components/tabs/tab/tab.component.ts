import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  @Input() title: string;
  @Input() img: string;
  active = false;
  constructor() { }

  ngOnInit() {
  }

}
