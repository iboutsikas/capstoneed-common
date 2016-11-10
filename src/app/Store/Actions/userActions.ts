import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable()
export class UserActions {
  static readonly USER_LOGIN = 'USER_LOGIN';
  userLogin(email: string, password: string, remember: string): Action {
    return {
      type: UserActions.USER_LOGIN,
      payload: {
        email: email,
        password: password,
        remember_me: remember
      }
    };
  }
  static readonly USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
  userLoginSuccess(user: User): Action {
    return {
      type: UserActions.USER_LOGIN_SUCCESS,
      payload: user
    };
  }

  static readonly USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
  userLoginFail(): Action {
    return {
      type: UserActions.USER_LOGIN_FAIL
    };
  }

  static readonly USER_LOGOUT = 'USER_LOGOUT';
  userLogout(): Action {
    return {
      type: UserActions.USER_LOGOUT
    };
  }

  static readonly USER_LOGOUT_SUCCESS= 'USER_LOGOUT_SUCCESS';
  userLogoutSuccess(): Action {
    return {
      type: UserActions.USER_LOGOUT_SUCCESS
    };
  }
}
