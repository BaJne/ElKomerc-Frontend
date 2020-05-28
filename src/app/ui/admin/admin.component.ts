import { MenuItem } from 'primeng/api';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {
  items: MenuItem[];
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'DashBoard',
        routerLink: 'dashboard',
        routerLinkActiveOptions: 'dashboard',
        icon: 'fab fa-flipboard'
      },
      {
        label: 'Narudžbenice',
        icon: 'fas fa-list-alt',
        routerLink: 'orders',
        // ,
        // items: [
        //   {label: 'New', icon: 'pi pi-fw pi-plus'},
        //   {label: 'Download', icon: 'pi pi-fw pi-download'}
        // ]
      }
    ];
  }
  ngAfterViewInit() {
    const buttons = document.querySelectorAll('a');
    buttons.forEach(btn => {
      btn.addEventListener('mousedown', (e) => {
        const x = e.clientX - e.target['offsetLeft'];
        const y = e.clientY - e.target['offsetTop'];
        const ripples = document.createElement('span');
        ripples.className = 'ripple';
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        btn.appendChild(ripples);
        setTimeout(() => {
          ripples.remove();
        }, 400);
      });
    });
  }
}