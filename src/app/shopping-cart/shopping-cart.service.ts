import { Observable } from 'rxjs/Observable';
import { Product, ShoppingCart, ShoppingCartItem } from './../models/models';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

 private arr = [];
  constructor(
    private db: AngularFireDatabase
  ) { }

  public async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .valueChanges().map((x: any) => new ShoppingCart(x.items));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    // tslint:disable-next-line:curly
    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(await cartId, product.$key);
    item$.valueChanges().take(1).subscribe((item: ShoppingCartItem) => {
      const quantity = (item ? item.quantity : 0) + change;
      // tslint:disable-next-line:curly
      if (quantity === 0) item$.remove();
      // tslint:disable-next-line:curly
      else
        item$.update({
          title: product.title,
          images: product.images,
          price: product.price,
          quantity: quantity
        });
    });
  }
}
