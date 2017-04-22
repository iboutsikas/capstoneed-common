import { ActionReducer, Action } from '@ngrx/store';
import { User } from '../Models/user';
import { UserActions } from '../Actions/user.actions';

const INITIAL_STATE: User = null;

export const userReducer: ActionReducer<User> = (state: User = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case UserActions.USER_LOGIN_SUCCESS:
    case UserActions.USER_UPDATE_SUCCESS:
      return Object.assign({}, state, action.payload);
    case UserActions.USER_LOGIN_FAIL:
      return null;
    case UserActions.USER_LOGOUT_SUCCESS:
      return null;
    default:
      return state;
  }
};
