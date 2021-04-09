import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MenuItem } from 'primeng/api';
import { OrderPreview } from '../../../models/order.model';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  items: MenuItem[];
  orders: OrderPreview[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.items = [
      {label: 'U obradi', icon: 'pi pi-fw pi-home'},
      {label: 'Odbijene', icon: 'pi pi-fw pi-calendar'},
      {label: 'Sve', icon: 'pi pi-fw pi-pencil'}
    ];
    this.adminService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

}
