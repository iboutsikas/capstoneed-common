import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { UserActions } from '../Actions/userActions';
import { UserType } from '../Models/user';
import { Router } from '@angular/router';

@Injectable()
export class RoutingEffects {
  constructor(private actions$: Actions, private router: Router) {

  }

  @Effect() loginRoute$ = this.actions$
    .ofType(UserActions.USER_LOGIN_SUCCESS)
    .map(action => action.payload.type)
    .do((type: UserType) => {
      if (type === UserType.STUDENT) {
        this.router.navigate(['/student']);
      }
      else if (type === UserType.LECTURER) {
        this.router.navigate(['/lecturer']);
      }
      else {
        this.router.navigate(['/home']);
      }
    })
    .ignoreElements();

  @Effect() logoutRoute$ = this.actions$
    .ofType(UserActions.USER_LOGOUT_SUCCESS)
    .do((_) => {
      this.router.navigate(['/home']);
    })
}
