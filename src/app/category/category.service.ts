import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAllCategory() {
    return this.db.list('/categories', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  getOneCategory(categoryId) {
    return this.db.object(`/categories/${categoryId}`);
  }

  create(product) {
    return this.db.list('/products').push(product);
  }

  update(productId, product) {
    this.db.object(`/products/${productId}`).update(product);
  }

}
