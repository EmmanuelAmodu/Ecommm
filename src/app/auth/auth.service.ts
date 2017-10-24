import { AppUser } from '../models/models';
import { ActivatedRoute } from '@angular/router';
import { User } from './user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { UserService } from '../user/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/Observable/of';

@Injectable()
export class AuthService {

  public user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = afAuth.authState;
  }

  login(method: number) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    // tslint:disable-next-line:curly
    switch (method) {
      case 0:
        this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
        break;
      case 1:
        this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
        break;
      default:
        break;
    }
  }

  loginWithGoogle() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  loginWithFB() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        // tslint:disable-next-line:curly
        if (user) return this.userService.get(user.uid);
        return Observable.of(null);
      });
  }
}


