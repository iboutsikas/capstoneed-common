import { Unit } from '../Models/unit';
import { ActionReducer, Action } from '@ngrx/store';
import { UnitActions } from '../Actions/unit.actions';
import { UserActions } from '../Actions/user.actions';

const INITIAL_STATE: Unit[] = [];

export const unitsReducer: ActionReducer<Unit[]> = (state: Unit[] = INITIAL_STATE, action: Action) =>{
  switch (action.type) {
    case UnitActions.LOAD_UNITS_SUCCESS:
      return [...action.payload].sort((a: Unit, b: Unit) => a.id - b.id);

    case UnitActions.LOAD_UNIT_SUCCESS:
      let rest = state.filter((u: Unit) => u.id != action.payload.id);
      return [...rest, action.payload].sort((a: Unit, b: Unit) => a.id - b.id);

    case UnitActions.DELETE_UNIT_SUCCESS:
      return state.filter(unit => unit.id != action.payload.id).sort((a: Unit, b: Unit) => a.id - b.id);

    case UserActions.USER_LOGOUT_SUCCESS:
      return INITIAL_STATE;
    default: return state;
  }
};
