import { AngularFireObject} from 'angularfire2/database';
import { Order, UserOrders } from './../../models/models';
import { OrderService } from './../../order/order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$;
  orders: UserOrders[] = [];

  constructor(private orderService: OrderService) {
      this.orderService.getAllUsersOrders().valueChanges().subscribe(d => {
        this.flattenOrders(d);
      });
  }

  private flattenOrders(d: any) {
    d.forEach(el => {
      // tslint:disable-next-line:forin
      for (const key in el) {
          this.orders.push(new UserOrders(el[key], key, el.$key));
      }
      console.log(this.orders);
  });
  }
}
