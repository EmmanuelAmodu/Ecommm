import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from './../models/models';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  showPaystack: boolean;
  orderKey: string;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router,
  ) {}

  callPayStackForm(event) {
    console.log(event);
    this.showPaystack = true;
    this.orderKey = event.key;
  }

  paymentDone(event) {
    console.log(event);
    this.router.navigate(['/orders', 'success', this.orderKey]);
  }

  paymentCancel() {
    console.log('cancelled');
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
