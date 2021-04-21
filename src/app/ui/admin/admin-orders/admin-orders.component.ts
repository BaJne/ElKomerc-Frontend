import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Order, OrderStatus } from '../../../models/order.model';
import { Router } from '@angular/router';
import { OrderSortBundle } from '../../../services/order.service';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  customSort: boolean;
  params: OrderSortBundle = {};
  totalOrders: number;
  orders: Order[];
  isSorting = false;
  statuses: OrderStatus[];
  activityValues = [0, 100];

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.statuses = OrderStatus.statuses;
    this.getOrders();
  }

  previewOrder(id: number){
    this.router.navigate(['admin/order/' + id]);
  }

  changePage(event: any){
    this.params.page = event.page+1;
    console.log(this.params.page);
    this.getOrders();
  }

  getOrders(){
    this.isSorting = true;
    this.adminService.getOrders(this.params).subscribe(data => {
      this.totalOrders = data.count;
      this.customSort = this.totalOrders > 20;
      this.orders = data.orders;
    });
  }

  sort(event: SortEvent){
    if(this.isSorting){
      this.isSorting = false;
      return;
    }
    this.params.order_by = (event.order === 1 ? '+' : '-') + event.field;
    this.getOrders();
  }
}
