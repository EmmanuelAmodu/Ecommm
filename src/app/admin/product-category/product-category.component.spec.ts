import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoductCategoryComponent } from './poduct-category.component';

describe('PoductCategoryComponent', () => {
  let component: PoductCategoryComponent;
  let fixture: ComponentFixture<PoductCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoductCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
