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

  @Effect() register = this._actions$
    .ofType(UserActions.USER_REGISTER)
    .map(action => action.payload)
    .map(payload => JSON.stringify(payload))
    .switchMap(json => this.chttp.post(`${BASE_URL}/users`, json)
      .map(res => res.json())
      .map(json => json.user)
      .switchMap(user => Observable.of(UserActions.userRegisterSuccess(user)))
      .catch(err => Observable.of(UserActions.userRegisterFail(err)))
    );

  @Effect() update = this._actions$
    .ofType(UserActions.USER_UPDATE)
    .map(action => action.payload)
    .switchMap(payload => {
      let json = JSON.stringify(payload);

      return this.chttp.patch(`${BASE_URL}/users/${payload.id}`, json)
        .map(res => res.json())
        .map(json => json.user)
        .switchMap(user => Observable.of(UserActions.userUpdateSuccess(user)))
        .catch(err => Observable.of(UserActions.userUpdateFail(err)))
    });

  @Effect({dispatch: false}) successUpdateToast = this._actions$
    .ofType(UserActions.USER_UPDATE_SUCCESS)
    .do(_ => {
      let config: ToastConfig = {
        timeOut: 1500
      };
      this.toastrService.success(`Profile updated successfully!`, 'Success', config);
    });

  @Effect({dispatch: false}) failUpdateToast = this._actions$
    .ofType(UserActions.USER_UPDATE_FAIL)
    .do(_ => {
      let config: ToastConfig = {
        timeOut: 1500
      };
      this.toastrService.error(`I could not update your profile`, 'Oops!', config);
    });

  @Effect() changePassword = this._actions$
    .ofType(UserActions.USER_CHANGE_PASSWORD)
    .map(action => action.payload)
    .switchMap(payload => {
      let json = JSON.stringify(payload);

      return this.chttp.patch(`${BASE_URL}/users/${payload.id}`, json)
        .map(res => res.json())
        .map(json => json.user)
        .switchMap(user => Observable.of(UserActions.userChangePasswordSuccess()))
        .catch(err => Observable.of(UserActions.userChangePasswordFail(err)))
    });

  @Effect() changePasswordLogout = this._actions$
    .ofType(UserActions.USER_CHANGE_PASSWORD_SUCCESS)
    .switchMap(_ => Observable.of(UserActions.userLogout()));

  @Effect({dispatch: false}) successPasswordChangeToast = this._actions$
    .ofType(UserActions.USER_CHANGE_PASSWORD_SUCCESS)
    .do(_ => {
      let config: ToastConfig = {
        timeOut: 1500
      };
      this.toastrService.success(`Password changed! I will log you out now!`, 'Success', config);
    });

  @Effect({dispatch: false}) failPasswordChangeToast = this._actions$
    .ofType(UserActions.USER_CHANGE_PASSWORD_FAIL)
    .do(_ => {
      let config: ToastConfig = {
        timeOut: 1500
      };
      this.toastrService.error(`I could not change your password.`, 'Oops!', config);
    });
}



