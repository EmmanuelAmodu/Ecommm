import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { Product } from './../models/app-user';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements  OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
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
  }
  async ngOnInit() {
    // tslint:disable-next-line:no-unused-expression
    this.subscription = (await this.shoppingCartService.getCart())
    .subscribe(cart => {
      this.cart = cart;
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
