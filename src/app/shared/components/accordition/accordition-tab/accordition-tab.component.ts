import { AccorditionService } from './../accordition.service';
import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-accordition-tab',
  templateUrl: './accordition-tab.component.html',
  styleUrls: ['./accordition-tab.component.css']
})
export class AccorditionTabComponent implements OnInit {
  private static idd = 0;
  id: number;
  appearance: string;
  isToggled: boolean;

  @Input() header: string;
  @Input() togglable = true;

  constructor(private a: AccorditionService) {}

  ngOnInit() {
    this.isToggled = false;
    this.appearance = this.a.appearance;
    this.id = AccorditionTabComponent.idd++;

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
      this.a.signal(this.id, this.header);
    }
    if (this.togglable) {
      this.isToggled = !this.isToggled;
    }
  }
}
