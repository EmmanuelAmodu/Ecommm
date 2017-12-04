import { AppUser } from './../models/models';
import { OrderService } from './../order/order.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  paymentId: string;
  order: any;
  user: any;

  constructor(
    private Route: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  private async getOrder(userId: string, orderId: string) {
    const orderO = await this.orderService.getUserOrders(userId, orderId);
    orderO.subscribe(order => {
      this.order = order;
      console.log(order);
    });
  }

  async ngOnInit() {
    const params = this.Route.params;
    this.authService.user$.subscribe(u => {
      console.log(u);
      this.user = u;
        const userId = u.uid;
        params.subscribe(d => {
          const orderId = d['id'];
          this.paymentId = userId + '-_-' + orderId;
          this.getOrder(userId, orderId);
        });
    });
  }
}
