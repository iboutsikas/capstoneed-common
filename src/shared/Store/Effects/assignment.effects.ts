import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { AssignmentActions } from '../Actions/assignmentActions';
import { CustomHttp } from '../../Services/customHttp';
import { BASE_URL, THROTTLE_TIME } from '../../Constants/settings';
import { UserActions } from '../Actions/userActions';

@Injectable()
export class AssignmentEffects {
  constructor(private actions: Actions, private chttp: CustomHttp) {

  }

  @Effect() loadAssignmentsForUnit = this.actions
    .ofType(AssignmentActions.LOAD_ASSIGNMENTS_FOR_UNIT)
    .throttleTime(THROTTLE_TIME)
    .map(action => action.payload)
    .switchMap(unitId => this.chttp.get(`${BASE_URL}/assignments?unit_id=${unitId}&includes=unit&compact=true`)
      .map(res => res.json())
      .switchMap(json => Observable.of(AssignmentActions.loadAssignmentsForUnitSuccess(json.assignments, unitId)))
      .catch(err => Observable.of(AssignmentActions.loadAssignmentsForUnitFail(unitId)))
    );

  @Effect() loadAssignments = this.actions
    .ofType(AssignmentActions.LOAD_ASSIGNMENTS)
    .throttleTime(THROTTLE_TIME)
    .switchMap(action => this.chttp.get(`${BASE_URL}/assignments?includes=unit;compact=true`)
      .map(res => res.json())
      .map(json => json.assignments)
      .switchMap(assignments => Observable.of(AssignmentActions.loadAssignmentsSuccess(assignments)))
      .catch(err => Observable.of(AssignmentActions.loadAssignmentsFail()))
    );

  @Effect() autoloadAssignmentsOnLogin = this.actions
    .ofType(UserActions.USER_LOGIN_SUCCESS)
    .switchMap(action => Observable.of(AssignmentActions.loadAssignments()));
}
