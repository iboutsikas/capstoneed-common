import { combineReducers } from '@ngrx/store';
import { compose}  from '@ngrx/core';
import { userReducer } from './userReducer';
import { User } from '../Models/user';
import { Unit } from '../Models/unit';
import { unitsReducer } from './unitsReducer';
import { Assignment } from '../Models/assignment';
import { assignmentsReducer } from './assignmentsReducer';

export interface IAppState {
  user: User,
  units: Unit[],
  assignments: Assignment[]
}

export default compose(combineReducers)({
  user: userReducer,
  units: unitsReducer,
  assignments: assignmentsReducer
})
