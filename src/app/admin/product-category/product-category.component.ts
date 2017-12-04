import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { EditSubcategoryComponent } from './edit-subcategory/edit-subcategory.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { Category, ICategory } from './../../models/models';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../category/category.service';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KeysPipe } from './../../keys.pipe';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent {

  categories$;
  categoryParams: any = {};

  @ViewChild('editCategory') editCategoryModal: EditCategoryComponent;
  @ViewChild('editSubCategory') editSubCategoryModal: EditSubcategoryComponent;
  @ViewChild('deleteCategory') deleteCategoryModal: DeleteCategoryComponent;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getAllCategories();
    this.route.queryParams.subscribe(params => {
      this.categoryParams = params;
    });
  }

  openCategoryModal(id?: string) {
    this.editCategoryModal.show(id);
  }

  openSubCategoryModal(categoryId?: string, subCategoryId?: string) {
    this.editSubCategoryModal.show(categoryId, subCategoryId);
  }

  deleteCategoryA(catId: string, subCatId?: string) {
    this.deleteCategoryModal.show(catId, subCatId);
  }

}
