import { CategoryService } from '../category/category.service';
import { ProductService } from './product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products$;
  categories$;

  constructor(
    productService: ProductService,
    categoryService: CategoryService
  ) {
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getAll();
  }

}
