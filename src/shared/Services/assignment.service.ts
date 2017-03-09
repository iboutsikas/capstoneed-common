import { Injectable } from '@angular/core';
import { IAppState } from '../Store/Reducers/index';
import { Store } from '@ngrx/store';
import { AssignmentActions } from '../Store/Actions/assignment.actions';
import { Assignment } from '../Store/Models/assignment';

@Injectable()
export class AssignmentService {

  constructor(private store: Store<IAppState>) {

  }

  public getAssignment(assignment_id: number): void {
    this.store.dispatch(AssignmentActions.loadAssignment(assignment_id))
  }

  public getAssignmentsForUnit(unit_id: number) {
    this.store.dispatch(AssignmentActions.loadAssignmentsForUnit(unit_id))
  }

  public createAssignment(new_assignment: Assignment): void {
    this.store.dispatch(AssignmentActions.createAssignment(new_assignment));
  }

  public getIterations(assignment_id: number): void {
    this.store.dispatch(AssignmentActions.getIterations(assignment_id));
  }
}
