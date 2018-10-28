import { Category } from '../models/models';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAllCategories() {
    return this.db.list('/categories', ref => ref.orderByChild('name'));
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

  createSubCategory(categoryId, subcategory) {
    return this.db.object(`/categories/${categoryId}/subCategories/${subcategory.name}`).set(subcategory);
  }

  updateCategory(categoryId, category) {
    return this.db.object(`/categories/${categoryId}`).update(category);
  }

  updateSubCategory(categoryId: string, subCatKey, subCategory) {
    this.db.object(`/categories/${categoryId}/subCategories/${subCatKey}`).remove();
    return this.db.object(`/categories/${categoryId}/subCategories/${subCategory.name}`).update(subCategory);
  }

  delete(categoryId: string, subCatKey?: string): Promise<void> {
    let str = '';
    subCatKey ? str = `/categories/${categoryId}/subCategories/${subCatKey}` : str = `/categories/${categoryId}`;
    return this.db.object(str).remove();
  }

}
