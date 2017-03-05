import { Assignment } from '../Models/assignment';
import { ActionReducer, Action } from '@ngrx/store';
import { AssignmentActions } from '../Actions/assignment.actions';
import { UserActions } from '../Actions/user.actions';

const INITIAL_STATE: Assignment[] = [];

export const assignmentsReducer: ActionReducer<Assignment[]> = (state: Assignment[] = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case AssignmentActions.LOAD_ASSIGNMENT_SUCCESS: {
      let remaining = state.filter((a: Assignment) => a.id != action.payload.id);
      return [...remaining, ...action.payload].sort((a: Assignment, b: Assignment) => a.id - b.id);
    }
    case AssignmentActions.LOAD_ASSIGNMENTS_SUCCESS:
      return [...action.payload].sort((a: Assignment, b: Assignment) => a.id - b.id);
    case AssignmentActions.LOAD_ASSIGNMENTS_FAIL:
      return state;
    case AssignmentActions.LOAD_ASSIGNMENTS_FOR_UNIT_SUCCESS:
      let remaining = state.filter((a: Assignment) => a.unit.id != action.payload.id);
      return [...remaining, ...action.payload.assignments].sort((a: Assignment, b: Assignment) => a.id - b.id);
    case AssignmentActions.LOAD_ASSIGNMENTS_FOR_UNIT_FAIL:
      return state;

    case AssignmentActions.CREATE_ASSIGNMENT_SUCCESS: {
      return [...state, action.payload].sort((a: Assignment, b: Assignment) => a.id - b.id);
    }
    case UserActions.USER_LOGOUT_SUCCESS:
      return INITIAL_STATE;


    default: return state;
  }
};
