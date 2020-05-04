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
  @Input() divStyle;
  @Input() headerStyle;
  @Input() header;
  @Input() togglable = true;
  @ViewChild('div', {static: true}) elem: ElementRef;

  isToggled: boolean;

  constructor() { }

  ngOnInit() {
    this.isToggled = !this.togglable;
  }
  onToggle() {
    this.isToggled = !this.isToggled;
  }

}
