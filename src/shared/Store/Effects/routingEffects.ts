import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { UserActions } from '../Actions/userActions';
import { UserType } from '../Models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RoutingEffects {
  constructor(private actions$: Actions, private router: Router) {

  }

  @Effect({dispatch: false}) logoutRoute$ = this.actions$
    .ofType(UserActions.USER_LOGOUT_SUCCESS)
    .do((_) => this.router.navigate(['/home']))
    .switchMap(_ => Observable.of(null))
}
