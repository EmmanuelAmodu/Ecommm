import { SubCategory } from '../../../models/models';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../category/category.service';
import { EditCategoryComponent } from './../edit-category/edit-category.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.css']
})
export class EditSubcategoryComponent {
  subCategory: SubCategory = new SubCategory();
  categoryId: string;
  subCatKey: string;
  preloader: boolean;
  showModal: boolean;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  show(id?: string, key?: string) {
    this.categoryId = id;
    this.subCatKey = key;
    id && key ? (this.preloader = true, this.categoryService.getSubCategory(id, key).subscribe(subCategory => {
      this.subCategory = subCategory;
      this.showModal = true;
      this.preloader = false;
    })) :
    this.showModal = true;
  }

  save() {
    this.subCatKey ?
      this.categoryService.updateSubCategory(this.categoryId, this.subCatKey, this.subCategory).then(res => {
        this.close();
      }) :
        this.categoryService.createSubCategory(this.categoryId, this.subCategory).then(res => {
          this.close();
        });
  }

  close() {
    this.subCategory = new SubCategory();
    this.categoryId = undefined;
    this.subCatKey = undefined;
    this.showModal = false;
  }

}
