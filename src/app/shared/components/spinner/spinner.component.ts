import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div class="lds-ripple"
  [ngStyle]="{'color': color !== undefined ? color : '#dfc'}">
  <div></div><div></div>
  </div>`,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() color: string;
  constructor() { }

  ngOnInit() {}

}
