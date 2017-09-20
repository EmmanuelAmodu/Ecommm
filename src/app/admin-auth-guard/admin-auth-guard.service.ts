import { UserService } from '../user/user.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(
    private _auth: AuthService,
    private userService: UserService
  ) { }

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this._auth.appUser$
      .map(appUser => appUser.isAdmin);
  }

}
