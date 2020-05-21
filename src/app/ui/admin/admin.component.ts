import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  items: MenuItem[];
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'DashBoard',
        icon: 'fab fa-flipboard',
        items: [
          {label: 'New', routerLink: 'dashboard', icon: 'pi pi-fw pi-plus'},
          {label: 'Download', icon: 'pi pi-fw pi-download'}
        ]
      },
      {
        label: 'Narudžbenice',
        icon: 'fas fa-list-alt',
        items: [
          {label: 'New', icon: 'pi pi-fw pi-plus'},
          {label: 'Download', icon: 'pi pi-fw pi-download', items: [
            {label: 'New', routerLink: 'orders', icon: 'pi pi-fw pi-plus'},
            {label: 'Download', icon: 'pi pi-fw pi-download'}
          ]}
        ]
      }
    ];
  }

}
