import { combineReducers } from '@ngrx/store';
import { compose}  from '@ngrx/core';
import { userReducer } from './userReducer';
import { User } from '../Models/user';
import { Unit } from '../Models/unit';
import { unitsReducer } from './unitsReducer';

export interface IAppState {
  user: User,
  units: Unit[]
}

export default compose(combineReducers)({
  user: userReducer,
  units: unitsReducer
})
