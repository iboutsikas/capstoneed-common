import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { User, UserRegistrationData, XP } from '../Models/user';

@Injectable()
export class UserActions {

  public static readonly USER_LOGIN = 'USER_LOGIN';
  public static readonly USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
  public static readonly USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
  public static readonly USER_LOGOUT = 'USER_LOGOUT';
  public static readonly USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
  public static readonly USER_LOGOUT_FAIL = 'USER_LOGOUT_FAIL';
  public static readonly USER_REGISTER = 'USER_REGISTER';
  public static readonly USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
  public static readonly USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';
  public static readonly USER_UPDATE = 'USER_UPDATE';
  public static readonly USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
  public static readonly USER_UPDATE_FAIL = 'USER_UPDATE_FAIL';
  public static readonly USER_CHANGE_PASSWORD = 'USER_CHANGE_PASSWORD';
  public static readonly USER_CHANGE_PASSWORD_SUCCESS = 'USER_CHANGE_PASSWORD_SUCCESS';
  public static readonly USER_CHANGE_PASSWORD_FAIL = 'USER_CHANGE_PASSWORD_FAIL';
  public static readonly USER_GAINED_XP = 'USER_GAINED_XP';


  public static userLogin(email: string, password: string, remember: string): Action {
    return {
      type: UserActions.USER_LOGIN,
      payload: {
        email: email,
        password: password,
        remember_me: remember
      }
    };
  }

  public static userLoginSuccess(user: User): Action {
    return {
      type: UserActions.USER_LOGIN_SUCCESS,
      payload: user
    };
  }

  public static userLoginFail(): Action {
    return {
      type: UserActions.USER_LOGIN_FAIL
    };
  }

  public static userLogout(): Action {
    return {
      type: UserActions.USER_LOGOUT
    };
  }

  public static userLogoutSuccess(): Action {
    return {
      type: UserActions.USER_LOGOUT_SUCCESS
    };
  }

  public static userLogoutFail(): Action {
    return {
      type: UserActions.USER_LOGOUT_FAIL
    };
  }

  public static userRegister(user: UserRegistrationData): Action {
    return {
      type: UserActions.USER_REGISTER,
      payload: user
    }
  }

  public static userRegisterSuccess(user: User): Action {
    return {
      type: UserActions.USER_REGISTER_SUCCESS,
      payload: user
    }
  }

  public static userRegisterFail(err: any): Action {
    return {
      type: UserActions.USER_REGISTER_FAIL,
      payload: err
    }
  }

  public static userUpdate(newValues: any): Action {
    return {
      type: UserActions.USER_UPDATE,
      payload: newValues
    }
  }

  public static userUpdateSuccess(user: User): Action {
    return {
      type: UserActions.USER_UPDATE_SUCCESS,
      payload: user
    }
  }

  public static userUpdateFail(err: any): Action {
    return {
      type: UserActions.USER_UPDATE_FAIL,
      payload: err
    }
  }

  public static userChangePassword(newValues: any): Action {
    return {
      type: UserActions.USER_CHANGE_PASSWORD,
      payload: newValues
    }
  }

  public static userChangePasswordSuccess(): Action {
    return {
      type: UserActions.USER_CHANGE_PASSWORD_SUCCESS
    }
  }

  public static userChangePasswordFail(err: any): Action {
    return {
      type: UserActions.USER_CHANGE_PASSWORD_FAIL,
      payload: err
    }
  }

  public static userGainedXP(xp: XP): Action {
    return {
      type: UserActions.USER_GAINED_XP,
      payload: xp
    }
  }

}
