import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { CustomHttp } from '../../Services/customHttp';
import { UnitActions } from '../Actions/unitActions';
import { BASE_URL } from '../../Constants/settings';
import { Observable } from 'rxjs';
import { UserActions } from '../Actions/userActions';

@Injectable()
export class UnitEffects {
  constructor(private actions: Actions, private chttp: CustomHttp) {

  }

  @Effect() loadUnits$ = this.actions
    .ofType(UnitActions.LOAD_UNITS)
    .switchMap(action => this.chttp.get(BASE_URL + '/units?includes=assignments;compact=true')
      .map(res => res.json().units)
      .switchMap(units => Observable.of(UnitActions.loadUnitsSuccess(units)))
    );

  @Effect() autoLoadUnits$ = this.actions
    .ofType(UserActions.USER_LOGIN_SUCCESS)
    .switchMap(action => Observable.of(UnitActions.loadUnits()));
}
