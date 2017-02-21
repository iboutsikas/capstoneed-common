import { combineReducers } from '@ngrx/store';
import { compose}  from '@ngrx/core';
import { userReducer } from './user.reducer';
import { User } from '../Models/user';
import { Unit } from '../Models/unit';
import { unitsReducer } from './unit.reducer';
import { Assignment } from '../Models/assignment';
import { assignmentsReducer } from './assignment.reducer';
import { Project } from '../Models/project';
import { projectsReducer } from './project.reducer';

export interface IAppState {
  user: User,
  units: Unit[],
  assignments: Assignment[],
  projects: Project[]
}

export default compose(combineReducers)({
  user: userReducer,
  units: unitsReducer,
  assignments: assignmentsReducer,
  projects: projectsReducer
})
