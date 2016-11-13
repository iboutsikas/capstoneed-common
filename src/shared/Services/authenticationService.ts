import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '../Store/Actions/userActions';
import { User } from '../Store/Models/user';
import { BehaviorSubject } from 'rxjs';
import { IAppState } from '../Store/Reducers/index';

@Injectable()
export class AuthenticationService {

  public user$: BehaviorSubject<User>;

  constructor(private store: Store<IAppState>, private userActions: UserActions) {
    this.user$ = new BehaviorSubject<User>(null);

    this.store.select('user').subscribe((user: User) => this.user$.next(user));
  }

  login(username: string, password: string, remember: boolean) {
    let rvalue = remember ? '1' : '0';
    this.store.dispatch(this.userActions.userLogin(username, password, rvalue));
  }

  logout() {
    this.store.dispatch(this.userActions.userLogout());
  }

}
