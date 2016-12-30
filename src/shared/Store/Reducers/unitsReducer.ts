import { Unit } from '../Models/unit';
import { ActionReducer, Action } from '@ngrx/store';
import { UnitActions } from '../Actions/unitActions';
import { UserActions } from '../Actions/userActions';

const INITIAL_STATE: Unit[] = [];

export const unitsReducer: ActionReducer<Unit[]> = (state: Unit[] = INITIAL_STATE, action: Action) =>{
  switch (action.type) {
    case UnitActions.LOAD_UNITS_SUCCESS:
      return [...action.payload];

    case UnitActions.DELETE_UNIT_SUCCESS:
      return state.filter(unit => unit.id != action.payload.id);

    case UserActions.USER_LOGOUT_SUCCESS:
      return [];
    default: return state;
  }
};
