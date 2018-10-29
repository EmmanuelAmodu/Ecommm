import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { Product, ShoppingCart } from './../models/models';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements  OnInit {
    @Input('category') category: string;
    products: Product[] = [];
    filteredProducts: Product[] = [];
    categoryParams: any = {};
    cart$: Observable<ShoppingCart>;
    showPreloader: boolean;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private shoppingCartService: ShoppingCartService
    ) {
        this.showPreloader = true;
    }

    async ngOnInit() {
        // tslint:disable-next-line:no-unused-expression
        this.cart$ = (await this.shoppingCartService.getCart());
        this.populateProducts();
    }

    private populateProducts() {
        this.productService.getProducts(this.category).valueChanges().switchMap((products: any) => {
            this.products = products;
            // tslint:disable-next-line:curly
            if (products) this.showPreloader = false;
            return this.route.queryParamMap;
        })
        .subscribe(params => {
            this.categoryParams = {
                subCategory: params.get('subcategory'),
                search_term: params.get('search_term')
            };
            this.applyFilter();
        });
    }

    private applyFilter() {
        const filterBySubCat = (this.categoryParams.subCategory) ?
        this.products.filter(p => p.subCategory === this.categoryParams.subCategory) : this.products;

        this.filteredProducts = (this.categoryParams.search_term) ?
        this.products.filter(p => {
            return p.title.toLocaleLowerCase().includes(this.categoryParams.search_term.toLocaleLowerCase()) ||
            p.description.toLocaleLowerCase().includes(this.categoryParams.search_term.toLocaleLowerCase());
        }) : filterBySubCat;
    }
}
