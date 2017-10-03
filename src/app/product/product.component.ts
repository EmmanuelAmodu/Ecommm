import { Product } from './../models/app-user';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category/category.service';
import { ProductService } from './product.service';
import { Component } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService
  ) {

    productService.getAll().switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    })
    .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
    });

    this.categories$ = categoryService.getAll();
  }

}
