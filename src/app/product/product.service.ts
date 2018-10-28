import { Product } from '../models/models';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
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

  getProducts(categoryId: string = "", limitTo: number = 30): AngularFireList<Product[]> {
    return this.db.list('/products', ref => {
        return ref.limitToFirst(limitTo).orderByChild("category").equalTo(categoryId)
    });
  }

  getOne(productId: string): AngularFireObject<Product> {
    return this.db.object(`/products/${productId}`);
  }

  delete(productId: string) {
    return this.db.object(`/products/${productId}`).remove();
  }
}
