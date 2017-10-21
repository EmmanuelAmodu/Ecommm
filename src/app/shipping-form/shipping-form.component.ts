import { OrderService } from './../order/order.service';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Order, ShoppingCart } from './../models/models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;

  shipping = {};
  userSubscription: Subscription;
  userId: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    const order = new Order(this.shipping, this.cart);
    const orderO = await this.orderService.placeOrder(order, this.userId);
    this.router.navigate(['/orders', 'success', orderO.key]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
