import { Observable } from 'rxjs/Observable';
import { Order } from '../models/models';
import { OrderService } from './../order/order.service';
import { AuthService } from './../auth/auth.service';

import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$: Observable<Order[]>;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {

    this.orders$ = authService.user$.switchMap(u => orderService.getOrders(u.uid));
  }
}
