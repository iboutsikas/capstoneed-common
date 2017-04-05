import { Iteration } from '../Models/iteration';
import { ActionReducer, Action } from '@ngrx/store';
import { AssignmentActions } from '../Actions/assignment.actions';
import { UserActions } from '../Actions/user.actions';

const INITIAL_STATE: Iteration[] = [];

export const iterationsReducer:ActionReducer<Iteration[]> = (state: Iteration[] = INITIAL_STATE, action: Action) => {
  switch(action.type) {
    case AssignmentActions.GET_ITERATIONS_FOR_ASSIGNMENT_SUCCESS: {
      let remaining = state.filter((i: Iteration) => i.assignment_id != action.payload.assignment_id);

      return [...remaining, action.payload.iterations].sort((a, b) => b.start_date - a.start_date);
    }

    case UserActions.USER_LOGOUT_SUCCESS: {
      return INITIAL_STATE;
    }
    default: return state;
  }
};
