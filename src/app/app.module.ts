import { OrderService } from './order/order.service';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { CustomFormsModule } from 'ng2-validation/dist';
import { ProductService } from './product/product.service';
import { FormsModule } from '@angular/forms';
import { CategoryService } from './category/category.service';
import { AdminAuthGuard } from './admin-auth-guard/admin-auth-guard.service';
import { UserService } from './user/user.service';
import { AuthGuard } from './auth-guard/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { RouterModule } from '@angular/router';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular5-data-table';
import { Angular4PaystackModule } from 'angular4-paystack';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { UploadService } from './file-upload/file-upload.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ProductCategoryComponent } from './admin/product-category/product-category.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { EditCategoryComponent } from './admin/product-category/edit-category/edit-category.component';
import { EditSubcategoryComponent } from './admin/product-category/edit-subcategory/edit-subcategory.component';
import { KeysPipe } from './keys.pipe';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';
import { AdminSliderComponent } from './admin/admin-slider/admin-slider.component';
import { CategoryComponent } from './category/category.component';
import { DeleteCategoryComponent } from './admin/product-category/delete-category/delete-category.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    UploadFormComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ProductCategoryComponent,
    PreloaderComponent,
    EditCategoryComponent,
    EditSubcategoryComponent,
    KeysPipe,
    SlideshowComponent,
    AdminSliderComponent,
    CategoryComponent,
    DeleteCategoryComponent
  ],
  imports: [
    Angular4PaystackModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    NgxCarouselModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductComponent },
      { path: 'cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },
      { path: 'category/:categoryID', component: CategoryComponent },

      { path: 'checkout', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'orders/success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },

      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/category',
        component: ProductCategoryComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      }
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    UploadService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
