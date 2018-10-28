import { AppUser } from '../models/models';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { UserService } from '../user/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/Observable/of';

@Injectable()
export class AuthService {

    public user$;

    constructor(
        private afAuth: AngularFireAuth,
        private route: ActivatedRoute,
        private userService: UserService
    ) {
        this.user$ = afAuth.authState;
    }

    loginWithGoogle() {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        localStorage.setItem('returnUrl', returnUrl);
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    loginWithFB() {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        localStorage.setItem('returnUrl', returnUrl);
        this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }

    loginWithPassword(email: string, password: string) {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        localStorage.setItem('returnUrl', returnUrl);
        this.afAuth.auth.signInWithEmailAndPassword(email, password);
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


