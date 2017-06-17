import { Iteration } from '../Models/iteration';
import { Action, ActionReducer } from '@ngrx/store';
import { IterationActions } from '../Actions/iteration.actions';
import { UserActions } from '../Actions/user.actions';
const INITIAL_STATE: Iteration[] = [];

export const scored_iterationsReducer:ActionReducer<Iteration[]> = (state: Iteration[] = INITIAL_STATE, action: Action) => {
  switch(action.type) {
    case IterationActions.GET_ALL_SCORED_SUCCESS: {
      return action.payload;
    }

    case UserActions.USER_LOGOUT_SUCCESS: {
      return INITIAL_STATE;
    }
    default: return state;
  }
};
