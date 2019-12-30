import { AccorditionService } from './accordition.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-accordition',
  templateUrl: './accordition.component.html',
  styleUrls: ['./accordition.component.css'],
  providers: [AccorditionService]
})
export class AccorditionComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  constructor(private a: AccorditionService) { }

  ngOnInit() {
    this.a.search.subscribe((s: string) => {
      this.search.emit(s);
    });
  }
}
