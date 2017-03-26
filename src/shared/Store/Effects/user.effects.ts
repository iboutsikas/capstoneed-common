import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { UserActions } from '../';
import { CustomHttp } from '../../Services/customHttp';
import { BASE_URL, LECTURER_URL, STUDENT_URL } from '../../Constants/settings';
import { ToastConfig, ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../Services/authentication.service';
import { UserType } from '../Models/user';

@Injectable()
export class UserEffects {
  constructor(private _actions$: Actions, private chttp: CustomHttp, private toastrService: ToastrService, private authService: AuthenticationService) { }


    @Effect() login$ = this._actions$
      .ofType(UserActions.USER_LOGIN)
      .map(action => JSON.stringify(action.payload))
      .switchMap(credentials => this.chttp.post(BASE_URL + '/sign_in', credentials)
        .map(res => res.json().user)
        .switchMap(user => {

          return Observable.of(UserActions.userLoginSuccess(user))
        })
        .catch(err => {
          this.toastrService.error('I\'m sorry but i couldn\'t sign you in ', 'Oops');
          return Observable.of(UserActions.userLoginFail());
        })
      );

    @Effect() logout$ = this._actions$
      .ofType(UserActions.USER_LOGOUT)
      .switchMap(action => this.chttp.post(BASE_URL + '/sign_out', {})
        .switchMap((_) => Observable.of(UserActions.userLogoutSuccess()))
        .catch(err => {
          console.log(err);
          return Observable.of(UserActions.userLogoutFail())
        })
      );

    @Effect({dispatch: false}) message = this._actions$
      .ofType(UserActions.USER_LOGIN_SUCCESS)
      .switchMap(user => {
        let config: ToastConfig = {
          timeOut: 1500
        };
        let result = this.toastrService.success(`Welcome ${user.payload.first_name}`, 'Success', config);

        result.portal.instance.Entity = user.payload;
        return Observable.of(null);
      });
}



