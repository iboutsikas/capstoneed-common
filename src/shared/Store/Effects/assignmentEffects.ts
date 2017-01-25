import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { AssignmentActions } from '../Actions/assignmentActions';
import { CustomHttp } from '../../Services/customHttp';
import { BASE_URL } from '../../Constants/settings';

@Injectable()
export class AssignmentEffects {
  constructor(private actions: Actions, private chttp: CustomHttp) {

  }

  @Effect() loadAssignmentsForUnit = this.actions
    .ofType(AssignmentActions.LOAD_ASSIGNMENTS_FOR_UNIT)
    .map(action => action.payload)
    .switchMap(unitId => this.chttp.get(BASE_URL + '/assignments?unit_id=' + unitId + ';includes=unit;compact=true')
      .map(res => res.json())
      .switchMap(json => Observable.of(AssignmentActions.loadAssignmentsForUnitSuccess(json.assignments, unitId)))
      .catch(err => Observable.of(AssignmentActions.loadAssignmentsForUnitFail(unitId)))
    )

}
