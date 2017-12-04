import { CategoryService } from './../../../category/category.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {
  catId: string;
  subCatId: string;
  category: any;

  constructor(
    protected categoryService: CategoryService
  ) { }

  show(catId: string, subCatId: string) {
    this.catId = catId;
    subCatId ?
      (this.subCatId = subCatId, this.categoryService.getSubCategory(catId, subCatId)
        .subscribe(category => this.category = category)) :
          this.categoryService.getCategory(catId).subscribe(category => this.category = category);
  }

  close() {
    this.catId = this.subCatId = this.category = undefined;
  }

  delete() {
    console.log(this.catId, this.subCatId);
    this.categoryService.delete(this.catId, this.subCatId).then(d => this.close());
  }

}
