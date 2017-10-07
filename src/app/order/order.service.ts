import { AuthService } from './../auth/auth.service';
import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order, userId) {
    const result = await this.db.list('/orders/' + userId).push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(userId?: string) {
    // tslint:disable-next-line:curly
    if (userId)
      return this.db.list('/orders/' + userId);
    // tslint:disable-next-line:curly
    else
      return this.db.object('/orders');
  }
}
