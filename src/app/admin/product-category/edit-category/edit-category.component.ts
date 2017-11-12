import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../category/category.service';
import { Category, ICategory } from './../../../models/models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {

  closeResult: string;
  category: Category = new Category();
  showModal: boolean;
  preloader: boolean;

  constructor(
    protected categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  show(id?: string) {
    id ? (this.preloader = true, this.categoryService.getCategory(id).subscribe(category => {
      this.category = category;
      this.showModal = true;
      this.preloader = false;
    })) :
    this.showModal = true;
  }

  close() {
    this.showModal = this.preloader  = false;
    this.category = new Category();
  }

  save() {
    let saveState: firebase.Promise<void>;
    this.category.$key ? saveState = this.categoryService.updateCategory(this.category.$key, this.category) :
      saveState = this.categoryService.createCategory(this.getTitle(), this.category);

    saveState.then(d => {
      this.close();
    }).catch(error => {
      console.log(error);
    });
  }

  private getTitle() {
    delete this.category.$key;
    let title = this.category.name.trim();
    while (title.indexOf(' ') > -1) {
      title = title.replace(' ', '_');
    }
    return title.toLowerCase();
  }

}
