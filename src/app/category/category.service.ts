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

  getAllSubCategory(categoryId: string) {
    return this.db.list(`/categories/${categoryId}/subCategories`);
  }

  getCategory(categoryId) {
    return this.db.object(`/categories/${categoryId}`);
  }

  getSubCategory(categoryId: string, subCategoryId: string) {
    return this.db.object(`/categories/${categoryId}/subCategories/${subCategoryId}`);
  }

  createCategory(categoryId, category) {
    return this.db.object(`/categories/${categoryId}`).set(category);
  }

  createSubCategory(categoryId, subCategoryId, subcategory) {
    console.log(categoryId, subCategoryId, subcategory);
    return this.db.object(`/categories/${categoryId}/subCategories/${subCategoryId}`).set(subcategory);
  }

  updateCategory(categoryId, category) {
    return this.db.object(`/categories/${categoryId}`).update(category);
  }

  updateSubCategory(categoryId: string, subCategoryId: string, subCategory) {
    return this.db.object(`/categories/${categoryId}/subCategories/${subCategoryId}`).update(subCategory);
  }

}
