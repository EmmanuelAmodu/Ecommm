import { Product } from '../models/models';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  update(productId, product) {
    this.db.object(`/products/${productId}`).update(product);
  }

  getAll() {
    return this.db.list('/products');
  }

  getOne(productId) {
    return this.db.object(`/products/${productId}`);
  }

  delete(productId) {
    return this.db.object(`/products/${productId}`).remove();
  }
}
