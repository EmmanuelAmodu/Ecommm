import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../category/category.service';
import { Component, Input } from '@angular/core';
import { ICategory } from '../../models/models';

@Component({
  selector: 'app-poduct-category',
  templateUrl: './poduct-category.component.html',
  styleUrls: ['./poduct-category.component.css']
})
export class PoductCategoryComponent {

  categories$;
  categoryParams: any = {};

  constructor(
    categoryService: CategoryService,
    private route: ActivatedRoute,
  ) {
    this.categories$ = categoryService.getAllCategories();
    this.route.queryParams.subscribe(params => {
      this.categoryParams = params;
    });
  }

}
