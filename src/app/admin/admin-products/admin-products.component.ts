import { DataTableResource, DataTableModule } from 'angular-4-data-table';
import { Product } from '../../models/app-user';
import { ProductService } from '../../product/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(
    private productService: ProductService
  ) {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.products = products;
        this.initializeTable(products);
      });
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    // tslint:disable-next-line:curly
    if (!this.tableResource) return;

    this.tableResource.query(params)
    .then(items => this.items = items);
  }

  filter(query: string) {
    const filteredProducts = (query) ? this.products.filter(d => {
      return d.title.toLowerCase().includes(query.toLowerCase()) || d.description.toLowerCase().includes(query.toLowerCase());
    }) : this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
