import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._auth.user$.map(user => {
      // tslint:disable-next-line:curly
      if (user) return true;
      this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    });
  }

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

}
