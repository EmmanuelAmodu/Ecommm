import { Product } from '../models/models';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  create(product: Product) {
    return this.db.list('/products').push(product);
  }

  update(productId: string, product: Product) {
    this.db.object(`/products/${productId}`).update(product);
  }

  getProducts(categoryId?: string, limitTo?: number): FirebaseListObservable<Product[]> {
    return this.db.list('/products', {
      query:
      {
         orderByChild: 'category',
         equalTo: categoryId,
         limitToFirst: limitTo
      }
    });
  }

  getOne(productId: string): FirebaseObjectObservable<Product> {
    return this.db.object(`/products/${productId}`);
  }

  delete(productId: string) {
    return this.db.object(`/products/${productId}`).remove();
  }
}
