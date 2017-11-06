import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAllCategories() {
    return this.db.list('/categories', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  getOneCategory(categoryId) {
    return this.db.object(`/categories/${categoryId}`);
  }

  create(category) {
    return this.db.list('/categories').push(category);
  }

  update(categoryId, category) {
    this.db.object(`/categories/${categoryId}`).update(category);
  }

}
