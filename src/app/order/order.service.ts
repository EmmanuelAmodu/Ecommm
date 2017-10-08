import { Order } from './../models/models';
import { AuthService } from './../auth/auth.service';
import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order, userId) {
    const result = await this.db.list('/orders/' + userId).push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getUsersOrders(userId?: string) {
      return this.db.list('/orders/' + userId);
  }

  getAllUsersOrders() {
      return this.db.list('/orders');
  }
}
