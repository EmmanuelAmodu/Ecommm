import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AppUser } from '../models/app-user';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  appUser: AppUser;

  constructor(
    private _auth: AuthService
  ) {
    _auth.appUser$.subscribe(appUser => this.appUser = appUser);
   }

  logout(): void {
    this._auth.logout();
  }
}
