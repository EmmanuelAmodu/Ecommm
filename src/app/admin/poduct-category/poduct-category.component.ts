import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../category/category.service';
import { Component, Input } from '@angular/core';
import { ICategory } from '../../models/models';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-poduct-category',
  templateUrl: './poduct-category.component.html',
  styleUrls: ['./poduct-category.component.css']
})
export class PoductCategoryComponent {

  categories$;
  categoryParams: any = {};
  closeResult: string;

  constructor(
    categoryService: CategoryService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.categories$ = categoryService.getAllCategories();
    this.route.queryParams.subscribe(params => {
      this.categoryParams = params;
    });
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
      console.log(reason);
      return  `with: ${reason}`;
    }
  }

}
