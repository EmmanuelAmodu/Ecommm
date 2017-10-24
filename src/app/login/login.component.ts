import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private _auth: AuthService
  ) { }

  loginWithGoogle(): void {
    this._auth.loginWithGoogle();
  }

  loginWithFB() {
    this._auth.loginWithFB();
  }

}
