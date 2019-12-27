import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() users = new EventEmitter<string>();
  name = 'Branislav';

  constructor() { }

  onAddNewUser() { this.users.emit(this.name); }

  ngOnInit() {
  }

}
