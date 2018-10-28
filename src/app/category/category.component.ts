import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { Product, ShoppingCart } from './../models/models';
import { ProductService } from './../product/product.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category$: Observable<string>;
  subCategory$: Observable<string>;
  cart$: Observable<ShoppingCart>;
  products: Product[];
  showPreloader = true;

  constructor(
    private _route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) { }

  loadProducts() {
    this.category$.subscribe(category => {
      this.showPreloader = true;
      this.productService.getProducts(category)
      .valueChanges()
      .subscribe((product: any) => {
        this.subCategory$.subscribe(subCategory => {
          this.products = subCategory ? product.filter(p => p.subCategory === subCategory) : product;
          this.showPreloader = false;
          console.log(this.products);
        });
      });
    });
  }

  async ngOnInit() {
    this.category$ = this._route.paramMap.map(params => params.get('categoryID'));
    this.subCategory$ = this._route.queryParamMap.map(params => params.get('subCategory'));
    this.cart$ = await this.shoppingCartService.getCart();
    this.loadProducts();
  }

}
