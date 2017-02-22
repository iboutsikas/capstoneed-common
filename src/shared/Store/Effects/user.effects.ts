import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { UserActions } from '../';
import { CustomHttp } from '../../Services/customHttp';
import { BASE_URL } from '../../Constants/settings';

@Injectable()
export class UserEffects {
  constructor(private _actions$: Actions, private chttp: CustomHttp) { }


    @Effect() login$ = this._actions$
      .ofType(UserActions.USER_LOGIN)
      .map(action => JSON.stringify(action.payload))
      .switchMap(credentials => this.chttp.post(BASE_URL + '/sign_in', credentials)
        .map(res => res.json().user)
        .switchMap(user => Observable.of(UserActions.userLoginSuccess(user)))
        .catch(err => Observable.of(UserActions.userLoginFail()))
      );

    @Effect() logout$ = this._actions$
      .ofType(UserActions.USER_LOGOUT)
      .switchMap(action => this.chttp.post(BASE_URL + '/sign_out', {})
        .switchMap((_) => Observable.of(UserActions.userLogoutSuccess()))
        .catch(err => Observable.of(UserActions.userLogoutFail()))
      );
}
