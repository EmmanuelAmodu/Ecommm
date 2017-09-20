import { ViewChild } from '@angular/core';
import { Product, Upload } from './../../models/app-user';
import { CategoryService } from './../../category/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  category$;
  closeResult: string;
  id: string;
  product: Product = new Product();

  constructor(
    private _router: Router,
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private modalService: NgbModal,
    private _route: ActivatedRoute
  ) {
    this.category$ = _categoryService.getCategories();
    this.id = this._route.snapshot.paramMap.get('id');
    // tslint:disable-next-line:curly
    if (this.id) this._productService.getOne(this.id).take(1).subscribe(product => this.product = product);
   }

  ngOnInit() {
  }

  save(content) {
    // tslint:disable-next-line:curly
    if (this.id) this._productService.update(this.id, this.product);
    // tslint:disable-next-line:curly
    else this._productService.create(this.product);
    this.open(content);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  public refreshForm(c) {
    this.product = new Product();
    c('Close click');
  }

  public goToProductList(d) {
    d('Close click');
    this._router.navigate(['/admin/products']);
  }

  public productImage(event) {
    const imageInfo = { name: event.name, url: event.url };
    this.product.imageUrls.push(imageInfo);
  }
}
