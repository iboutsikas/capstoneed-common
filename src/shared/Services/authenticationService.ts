import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '../Store/Actions/userActions';
import { User } from '../Store/Models/user';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IAppState } from '../Store/Reducers/index';
import { CustomHttp } from './customHttp';
import { BASE_URL } from '../Constants/settings';

@Injectable()
export class AuthenticationService {

  private meSub: Subscription;

  public isLoggedIn$: BehaviorSubject<boolean>;

  constructor(private store: Store<IAppState>, private userActions: UserActions, private chttp: CustomHttp) {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);

    this.store.select('user').subscribe((user: User) => {
      if (user) {
        this.isLoggedIn$.next(true);
      } else {
        this.isLoggedIn$.next(false);
      }
    });
  }

  login(username: string, password: string, remember: boolean) {
    let rvalue = remember ? '1' : '0';
    this.store.dispatch(this.userActions.userLogin(username, password, rvalue));
  }

  logout() {
    this.store.dispatch(this.userActions.userLogout());
  }

  getMe() {
    if (this.meSub) {
      this.meSub.unsubscribe();
    }
    this.meSub = this.chttp.get(BASE_URL + '/me')
      .map(res => res.json().user)
      .subscribe(
        user => this.store.dispatch(this.userActions.userLoginSuccess(user)),
        err => console.log('assuming fresh login'),
        () => {}
      );
  }
}
