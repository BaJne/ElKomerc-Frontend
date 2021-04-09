import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  items: MenuItem[];

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
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
      },
      {
        label: 'Proizvodi',
        icon: 'fas fas fa-tags',
        routerLink: 'products'
      },
      {
        label: 'Police',
        icon: 'fas fas fa-columns',
        items: [
          {label: 'Pregled', icon: 'fas fa-search', routerLink: 'shelf'},
          {label: 'Napravi', icon: 'fas fa-plus', routerLink: 'shelf-edit/new'}
        ]
      }

    ];
  }

  /*ngAfterViewInit() {
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
  }*/
}
