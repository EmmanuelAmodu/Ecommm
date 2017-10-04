import { CategoryService } from '../../category/category.service';
import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;
  @Input() category: string;

  constructor(
    categoryService: CategoryService
  ) {
    this.categories$ = categoryService.getAll();
  }

}
