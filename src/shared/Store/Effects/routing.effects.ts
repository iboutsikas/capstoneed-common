import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { UserActions } from '../Actions/user.actions';
import { UserType } from '../Models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../Services/authentication.service';
import { LECTURER_URL, STUDENT_URL } from '../../Constants/settings';

@Injectable()
export class RoutingEffects {
  constructor(private actions$: Actions, private router: Router, private authService: AuthenticationService) {

  }

  @Effect({dispatch: false}) logoutRoute$ = this.actions$
    .ofType(UserActions.USER_LOGOUT_SUCCESS)
    .do((_) => this.router.navigate(['/home']))
    .switchMap(_ => Observable.of(null));

  @Effect({ dispatch: false }) correctUserAppRedirect = this.actions$
    .ofType(UserActions.USER_LOGIN_SUCCESS)
    .map(action => action.payload)
    .filter(user => user != null)
    .filter(user => user.type != this.authService.userType)
    .do(_ => console.log('i should redirect'))
    .do(user => {
      if(user.type === UserType.LECTURER) {
        window.location.href = LECTURER_URL;
      } else if(user.type === UserType.STUDENT) {
        window.location.href = STUDENT_URL;
      } else {
        console.log('something is super wrong with UserType');
      }
    });
}
