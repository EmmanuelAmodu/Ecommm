import { QueryParamsHandling } from '@angular/router/src/config';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2/database';
import { CategoryService } from './../category/category.service';
import { ShoppingCart, ICategory } from './../models/models';
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
  categories: any[];
  category_toggle = false;

  constructor(
    private _auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private shoppingCartService: ShoppingCartService
  ) {
     this.categoryService.getAllCategories().subscribe(d => {
      this.categories = d;
      console.log(d);
    });
  }

  logout(): void {
    this._auth.logout();
  }

  updateQueryParams(search_term) {
    this.router.navigate(['/'], { queryParams: {search_term: search_term}, queryParamsHandling: 'merge' });
  }

  async ngOnInit() {
    this. _auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
