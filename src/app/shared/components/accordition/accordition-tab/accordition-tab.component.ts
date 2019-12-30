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

  @Input() header: string;
  isToggled: boolean;

  constructor(private a: AccorditionService) {}

  ngOnInit() {
    this.isToggled = false;
    this.id = AccorditionTabComponent.idd++;
    this.a.toggled.subscribe((e: number) => {
      if (e === this.id) {
        this.isToggled = false;
      }
    });
  }
  onToggle() {
    if (!this.isToggled) {
      this.a.signal(this.id, this.header);
    }
    this.isToggled = !this.isToggled;
  }
}
