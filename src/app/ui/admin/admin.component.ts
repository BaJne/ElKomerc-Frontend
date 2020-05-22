import { MenuItem } from 'primeng/api';
import { Component, OnInit, AfterViewInit } from '@angular/core';

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
            {
              label: 'Download',
              icon: 'pi pi-fw pi-download',
              items: [
                {label: 'New', icon: 'pi pi-fw pi-plus'},
                {label: 'Download', icon: 'pi pi-fw pi-download', items: [
                  {label: 'New', routerLink: 'orders', icon: 'pi pi-fw pi-plus'},
                  {label: 'Download', icon: 'pi pi-fw pi-download'}
                ]}
              ]
            }
          ]}
        ]
      }
    ];
  }
  ngAfterViewInit() {
    const buttons = document.querySelectorAll('a');
    console.log(buttons);
    buttons.forEach(btn => {
      btn.addEventListener('mousedown', (e) => {
        let x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
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
