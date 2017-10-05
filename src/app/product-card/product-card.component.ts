import { ShoppingCart } from './../models/app-user';
import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { Product } from '../models/app-user';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product;
  @Input('showActions') showActions = true;
  @Input('smallImage') smallImage = true;
  @Input('shoppingCart') shoppingCart: ShoppingCart;

  constructor(
    private sanitizer: DomSanitizer,
    private cartService: ShoppingCartService
  ) { }

  getStyle() {
    if (this.smallImage) {
      const style = 'width:238px; height:238px';
      return this.sanitizer.bypassSecurityTrustStyle(style);
    }
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
