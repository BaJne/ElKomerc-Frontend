import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  @Input() style;
  @Input() header;
  @ViewChild('div', {static: true}) elem: ElementRef;

  isToggled: boolean;

  constructor() { }

  ngOnInit() {
    this.isToggled = false;
  }
  onToggle() {
    this.isToggled = !this.isToggled;
  }

}
