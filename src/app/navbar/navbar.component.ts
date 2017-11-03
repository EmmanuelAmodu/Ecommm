import { ShoppingCart } from './../models/models';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AppUser } from '../models/models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  category_toggle = false;

  constructor(
    private _auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {

   }

  logout(): void {
    this._auth.logout();
  }

  async ngOnInit() {
    this. _auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
