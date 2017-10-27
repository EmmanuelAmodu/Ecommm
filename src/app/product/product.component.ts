import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { Product, ShoppingCart } from './../models/models';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements  OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categoryParams: any;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {  }

  async ngOnInit() {
    // tslint:disable-next-line:no-unused-expression
    this.cart$ = (await this.shoppingCartService.getCart());
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
    .subscribe(params => {
        this.categoryParams = {category: params.get('category'), subcategory: params.get('subcategory')};
        this.applyFilter();
        console.log(this.categoryParams);
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.categoryParams.category) ?
      this.products.filter(p => p.category === this.categoryParams.category) : this.products;
  }
}
