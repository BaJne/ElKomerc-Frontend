import { Component, Input, OnInit } from '@angular/core';

export interface TimelineEvent{
  title: string,
  message: string,
  time: Date,
  icon: string,
  color: string,
  isLeft: boolean
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  @Input('events') events:TimelineEvent[];

  constructor() { }

  ngOnInit(): void {
  }

}


