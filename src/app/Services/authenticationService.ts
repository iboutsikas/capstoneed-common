import { Injectable } from '@angular/core';
import { IAppState } from '../Store';
import { Store } from '@ngrx/store';
import { UserActions } from '../Store/Actions/userActions';

@Injectable()
export class AuthenticationService {

  constructor(private store: Store<IAppState>, private userActions: UserActions) {

  }

  login(username: string, password: string, remember: boolean) {
    let rvalue = remember ? '1' : '0';
    this.store.dispatch(this.userActions.userLogin(username, password, rvalue));
  }

}
