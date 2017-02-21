import { Injectable } from '@angular/core';
import { IAppState } from '../Store/Reducers/index';
import { Store } from '@ngrx/store';
import { AssignmentActions } from '../Store/Actions/assignment.actions';

@Injectable()
export class AssignmentService {

  constructor(private store: Store<IAppState>) {

  }

  public getAssignmentsForUnit(unit_id: number) {
    this.store.dispatch(AssignmentActions.loadAssignmentsForUnit(unit_id))
  }
}
