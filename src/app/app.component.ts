import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (
    private _auth: AuthService,
    private _router: Router,
    private userservice: UserService
  ) {
    _auth.user$.subscribe(user => {
      if (user) {
        userservice.save(user);
        const returnUrl = localStorage.getItem('returnUrl');
        _router.navigateByUrl(returnUrl);
      }
    });
  }
}
