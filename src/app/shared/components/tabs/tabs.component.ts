import { TabComponent } from './tab/tab.component';
import { Component, OnInit, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  activeTab: TabComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.tabs.first.active = true;
    this.activeTab = this.tabs.first;

  }

  selectTab(t: any) {
    this.activeTab.active = false;
    t.active = true;
    this.activeTab = t;
  }

}
