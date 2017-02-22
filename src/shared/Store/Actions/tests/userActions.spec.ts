import { TestBed } from '@angular/core/testing';
import { UserActions } from '../user.actions';
import { UserType, User } from '../../Models/user';

describe('Actions: User', () => {
  it('should create a LOGIN action', () => {
    let email = 'email';
    let password = 'password';
    let remember = '1';
    let expected = {
      type: 'USER_LOGIN',
      payload: {
        email: email,
        password: password,
        remember_me: remember
      }
    };

    let actual = UserActions.userLogin(email, password, remember);

    expect(actual).toEqual(expected);
  });

  it('should create a LOGIN_SUCCESS action', () => {
    let user: User = {
      id: 33639,
      type: UserType.STUDENT,
      first_name: "Mireille",
      last_name: "Buckridge",
      email: "estelle@hotmail.com"
    };

    let expected = {
      type: 'USER_LOGIN_SUCCESS',
      payload: user
    }
    let actual= UserActions.userLoginSuccess(user);

    expect(actual).toEqual(expected);
  });

  it('should create a LOGIN_FAIL action', () => {
    let expected = {
      type: 'USER_LOGIN_FAIL'
    }

    let actual = UserActions.userLoginFail();

    expect(actual).toEqual(expected);
  });

  it('should create a LOGOUT action', () => {
    let expected = {
      type: 'USER_LOGOUT'
    };

    let actual = UserActions.userLogout();

    expect(actual).toEqual(expected);
  });

  it('should create a LOGOUT_SUCCESS action' , () => {
    let expected = {
      type: 'USER_LOGOUT_SUCCESS'
    };

    let actual = UserActions.userLogoutSuccess();

    expect(actual).toEqual(expected);
  });

  it('should create a LOGOUT_FAIL action' , () => {
    let expected = {
      type: 'USER_LOGOUT_FAIL'
    };

    let actual = UserActions.userLogoutFail();

    expect(actual).toEqual(expected);
  });
});
