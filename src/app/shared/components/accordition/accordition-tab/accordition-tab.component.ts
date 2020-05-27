import { AccorditionService } from './../accordition.service';
import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-accordition-tab',
  templateUrl: './accordition-tab.component.html',
  styleUrls: ['./accordition-tab.component.css']
})
export class AccorditionTabComponent implements OnInit {
  id: number;
  appearance: string;
  isToggled = false;
  opened: number;

  @Input() header: string;
  @Input() togglable = true;

  constructor(private a: AccorditionService) {
    this.opened = a.opened;
  }

  ngOnInit() {
    this.appearance = this.a.appearance;
    this.id = this.a.idd++;

    if (this.opened === this.id) {
      this.isToggled = true;
    }

    if (this.togglable) {
      this.a.toggled.subscribe((e: number) => {
        if (e === this.id) {
          this.isToggled = false;
        }
      });
    }
  }

  onToggle() {
    if (!this.isToggled) {
      console.log(this.id);
      this.a.signal(this.id, this.id);
    }
    if (this.togglable) {
      this.isToggled = !this.isToggled;
    }
  }
}
