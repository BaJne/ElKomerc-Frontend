import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentItemStatus, Order } from 'src/app/models/order.model';
import { OrderStatusCode, OrderStatus, PaymentItem } from '../../../models/order.model';
import { TimelineEvent } from '../../../shared/components/timeline/timeline.component';
import { ItemDiffer } from '../../../models/item-differ.model';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-order-preview',
  templateUrl: './admin-order-preview.component.html',
  styleUrls: ['./admin-order-preview.component.css']
})
export class AdminOrderPreviewComponent implements OnInit, OnDestroy {

  selectedTabIndex = 0;
  commentHistory: TimelineEvent[] = []
  showChanges: boolean = false;

  routeSub: Subscription;

  items: ItemDiffer = new ItemDiffer();

  order: Order = null;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(param=>{
      this.getOrderDetail(+param.id);
    });
  }

  getOrderDetail(id: number){
    this.adminService.getOrderDetails(id).subscribe(data=>{
      if(data !== undefined){
        this.order = data;
        this.cofigureOrderHistory();
        this.initProductItems();
      }
    });
  }

  cofigureOrderHistory() {
    this.order.history.forEach(el => {
      let orderStatus = OrderStatus.statuses[el.status];
      this.commentHistory.push(
        {
          message: el.comment,
          time: el.time_created,
          title: orderStatus.text,
          color: orderStatus.color,
          icon: orderStatus.icon,
          isLeft: el.is_staff
        }
      )
    });
  }

  initProductItems() {
    this.order.payment_items.forEach(item => {
      const _item = this.constructInputItem(item);
      this.items.insertItem(item.article_id, _item, item.valid);
    });
    this.items.finishInitialization();
  }

  constructInputItem(item: PaymentItem):{[key: string]: any}{
    let _item: {[key: string]: any};
    _item = {
      "article_code": item.article_code,
      "name": item.name,
      "discount": item.discount,
      "price": item.price,
      "measure": item.unit_of_measure,
      "count": item.count,
      "attributes": item.article_attributes
    }
    return _item;
  }

}
