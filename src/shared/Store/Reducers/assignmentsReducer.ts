import { Assignment } from '../Models/assignment';
import { ActionReducer, Action } from '@ngrx/store';
import { AssignmentActions } from '../Actions/assignmentActions';
import { UserActions } from '../Actions/userActions';

const INITIAL_STATE: Assignment[] = [];

export const assignmentsReducer: ActionReducer<Assignment[]> = (state: Assignment[] = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case AssignmentActions.LOAD_ASSIGNMENTS_SUCCESS:
      return [...action.payload];
    case AssignmentActions.LOAD_ASSIGNMENTS_FAIL:
      return state;
    case AssignmentActions.LOAD_ASSIGNMENTS_FOR_UNIT_SUCCESS:
      let remaining = state.filter((a: Assignment) => a.unit.id != action.payload.id);
      return [...remaining, ...action.payload.assignments];
    case AssignmentActions.LOAD_ASSIGNMENTS_FOR_UNIT_FAIL:
      return state;
    case UserActions.USER_LOGOUT_SUCCESS:
      return INITIAL_STATE;


    default: return state;
  }
};
