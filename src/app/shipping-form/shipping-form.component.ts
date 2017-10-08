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
  @Output('orderPlacementStatus') orderPlacementStatus  = new EventEmitter();

  shipping = {};
  userSubscription: Subscription;
  userId: string;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    const order = new Order(this.shipping, this.cart);
    const result$ = await this.orderService.placeOrder(order, this.userId);
    this.orderPlacementStatus.emit(result$);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
