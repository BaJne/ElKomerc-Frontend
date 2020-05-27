import { AccorditionService } from './accordition.service';
import { Component, OnInit, Output, EventEmitter, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-accordition',
  templateUrl: './accordition.component.html',
  styleUrls: ['./accordition.component.css']
})
export class AccorditionComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  @Input() style = 'group';
  name: ElementRef;
  constructor(private a: AccorditionService) { }

  ngOnInit() {
    this.a.appearance = this.style;        // Setovanje izgleda
    this.a.search.subscribe((s: string) => {
      this.search.emit(s);
    });
  }
}
